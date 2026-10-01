#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');

const TOKEN = process.env.TOKEN || '';
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');

async function uploadRecord(collectionName, record) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(record);
    const options = {
      socketPath: '/run/cm4all/http/tie.socket',
      hostname: 'localhost',
      path: `/.sfs-bd/api/collections/${collectionName}/records`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          success: res.statusCode === 200,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({
        status: 0,
        success: false,
        error: err.message
      });
    });
    
    req.write(postData);
    req.end();
  });
}

async function main() {
  const publishers = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'publishers.json')));
  
  console.log('Teste Upload von erstem Publisher...');
  console.log('Daten:', JSON.stringify(publishers[0], null, 2));
  
  const result = await uploadRecord('publishers', publishers[0]);
  console.log('\nResponse:', result);
  
  if (result.status === 200) {
    console.log('✅ Success!');
  } else {
    console.log('❌ Failed');
    if (result.body) {
      console.log('Response body:', result.body);
    }
  }
}

main();
