import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractVersionAndName(fileName) {
  // Match version pattern: v1.2.3, v0.1.0, etc.
  const versionMatch = fileName.match(/v(\d+\.\d+\.\d+)/i);
  const version = versionMatch ? versionMatch[1] : null;
  
  // Extract base name without extension
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  
  return { version, baseName };
}

export default function excelUploadPlugin() {
  return {
    name: 'excel-upload-plugin',
    configureServer(server) {
      // Endpoint for saving base64-encoded Excel files
      server.middlewares.use('/api/save-excel', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const baseUploadDir = path.join(__dirname, 'uploads', 'xlsx');
        
        if (!fs.existsSync(baseUploadDir)) {
          fs.mkdirSync(baseUploadDir, { recursive: true });
        }

        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const jsonData = JSON.parse(body);
            const { fileName, fileData } = jsonData;

            if (!fileName || !fileData) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing fileName or fileData' }));
              return;
            }

            // Extract version and base name
            const { version, baseName } = extractVersionAndName(fileName);
            
            let uploadDir = baseUploadDir;
            let subDirName = null;

            if (version && baseName) {
              subDirName = baseName;
              uploadDir = path.join(baseUploadDir, subDirName);
              
              if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
              }
            }

            // Save file with timestamp prefix
            const timestamp = Date.now();
            const uniqueFileName = `${timestamp}-${fileName}`;
            const filePath = path.join(uploadDir, uniqueFileName);

            // Decode base64 and write
            const buffer = Buffer.from(fileData, 'base64');
            fs.writeFileSync(filePath, buffer);

            console.log(`✓ Excel-Datei gespeichert: ${filePath}`);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              path: filePath,
              fileName: uniqueFileName,
              timestamp,
              version,
              baseName,
              subDirectory: subDirName
            }));
          } catch (err) {
            console.error('Save error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });

        req.on('error', (err) => {
          console.error('Request error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        });
      });

      // Legacy multipart upload endpoint (kept for compatibility)
      server.middlewares.use('/api/upload-excel', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const baseUploadDir = path.join(__dirname, 'uploads', 'xlsx');
        
        // Ensure base directory exists
        if (!fs.existsSync(baseUploadDir)) {
          fs.mkdirSync(baseUploadDir, { recursive: true });
        }

        try {
          let body = Buffer.alloc(0);

          req.on('data', (chunk) => {
            body = Buffer.concat([body, chunk]);
          });

          req.on('end', () => {
            try {
              const contentType = req.headers['content-type'] || '';
              const boundaryMatch = contentType.match(/boundary=([^;]+)/);
              
              if (!boundaryMatch) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid content-type' }));
                return;
              }

              const boundary = boundaryMatch[1];
              const parts = body.toString('binary').split(`--${boundary}`);
              
              let fileData = null;
              let fileName = null;

              for (const part of parts) {
                const match = part.match(/filename="([^"]+)"/);
                if (match) {
                  fileName = match[1];
                  
                  // Find the file data between headers and boundary
                  const headerEnd = part.indexOf('\r\n\r\n');
                  if (headerEnd !== -1) {
                    const dataStart = headerEnd + 4;
                    const dataEnd = part.lastIndexOf('\r\n');
                    fileData = Buffer.from(part.substring(dataStart, dataEnd), 'binary');
                  }
                  break;
                }
              }

              if (!fileData || !fileName) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'No file provided' }));
                return;
              }

              // Extract version and base name
              const { version, baseName } = extractVersionAndName(fileName);
              
              // Determine upload directory based on version
              let uploadDir = baseUploadDir;
              let subDirName = null;

              if (version && baseName) {
                subDirName = baseName;
                uploadDir = path.join(baseUploadDir, subDirName);
                
                // Create version-specific subdirectory
                if (!fs.existsSync(uploadDir)) {
                  fs.mkdirSync(uploadDir, { recursive: true });
                }
              }

              // Save file with timestamp prefix
              const timestamp = Date.now();
              const uniqueFileName = `${timestamp}-${fileName}`;
              const filePath = path.join(uploadDir, uniqueFileName);

              fs.writeFileSync(filePath, fileData);

              console.log(`✓ Excel-Datei hochgeladen: ${filePath}`);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                path: filePath,
                fileName: uniqueFileName,
                timestamp,
                version,
                baseName,
                subDirectory: subDirName
              }));
            } catch (err) {
              console.error('Upload processing error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });

          req.on('error', (err) => {
            console.error('Request error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          });
        } catch (err) {
          console.error('Upload handler error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}
