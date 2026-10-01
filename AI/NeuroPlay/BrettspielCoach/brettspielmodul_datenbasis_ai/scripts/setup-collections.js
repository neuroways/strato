const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const SOCKET_PATH = '/run/cm4all/http/tie.socket';
const BASE_URL = 'http://localhost/.sfs-bd/api';

// Get token from pb_gen_token_sfs.js
const tokenResult = spawn('node', ['/etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js'], {
  timeout: 5000
});

let token = '';
tokenResult.stdout.on('data', (data) => {
  token += data.toString().trim();
});

tokenResult.on('close', (code) => {
  if (code !== 0 || !token) {
    console.error('Failed to get token');
    process.exit(1);
  }
  
  console.log('Token acquired');
  createCollections(token);
});

function makeRequest(method, endpoint, data, token) {
  return new Promise((resolve, reject) => {
    const net = require('net');
    const socket = net.createConnection(SOCKET_PATH, () => {
      const body = data ? JSON.stringify(data) : '';
      const contentLength = data ? Buffer.byteLength(body) : 0;

      let request = `${method} ${endpoint} HTTP/1.1\r\n`;
      request += `Host: localhost\r\n`;
      request += `Authorization: Bearer ${token}\r\n`;
      request += `Content-Type: application/json\r\n`;
      request += `Content-Length: ${contentLength}\r\n`;
      request += `Connection: close\r\n`;
      request += `\r\n`;
      if (body) request += body;

      socket.write(request);
    });

    let response = '';
    socket.on('data', (chunk) => {
      response += chunk.toString();
    });

    socket.on('end', () => {
      try {
        const parts = response.split('\r\n\r\n');
        const jsonPart = parts[1];
        if (jsonPart) {
          const parsed = JSON.parse(jsonPart);
          resolve(parsed);
        } else {
          resolve({ error: 'No response body' });
        }
      } catch (e) {
        resolve({ error: response });
      }
    });

    socket.on('error', reject);
  });
}

async function createCollections(token) {
  const collections = [
    {
      name: 'publishers',
      type: 'base',
      fields: [
        {name: 'id', type: 'text', required: true, id: true},
        {name: 'external_id', type: 'text'},
        {name: 'name', type: 'text', required: true},
        {name: 'country', type: 'text'},
        {name: 'website', type: 'url'},
        {name: 'priority', type: 'number', required: false},
        {name: 'status', type: 'text'}
      ]
    },
    {
      name: 'games',
      type: 'base',
      fields: [
        {name: 'id', type: 'text', required: true, id: true},
        {name: 'external_id', type: 'text'},
        {name: 'title', type: 'text', required: true},
        {name: 'original_title', type: 'text'},
        {name: 'publisher_id', type: 'relation', collectionId: 'publishers'},
        {name: 'category', type: 'text'},
        {name: 'game_type', type: 'text'},
        {name: 'min_players', type: 'number', required: false},
        {name: 'max_players', type: 'number', required: false},
        {name: 'min_duration', type: 'number', required: false},
        {name: 'max_duration', type: 'number', required: false},
        {name: 'min_age', type: 'number', required: false},
        {name: 'complexity', type: 'text'},
        {name: 'description', type: 'text'},
        {name: 'year_published', type: 'number', required: false}
      ]
    }
  ];

  for (const col of collections) {
    try {
      console.log(`Creating collection: ${col.name}`);
      const result = await makeRequest('POST', `${BASE_URL}/collections`, col, token);
      
      if (result.name) {
        console.log(`  ✓ ${col.name}`);
      } else {
        console.log(`  ✗ ${result.message || 'Unknown error'}`);
      }
    } catch (e) {
      console.error(`  ✗ ${e.message}`);
    }
  }
}
