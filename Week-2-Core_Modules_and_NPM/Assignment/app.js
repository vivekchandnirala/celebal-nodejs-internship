
const http = require('http');        // For creating server
const fs = require('fs');            // For file operations
const path = require('path');        // For safe path handling

const PORT = 3000;                   // Port number
const filePath = path.join(__dirname, 'execute.txt');  // Safe full path

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // CREATE a file
  if (url === '/create' && method === 'GET') {
    fs.writeFile(filePath, 'Hello, My name is Vivek Chand Nirala', (err) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error creating file');
      }
      res.writeHead(200);
      res.end('File created successfully');
    });
  }

  // READ the file
  else if (url === '/read' && method === 'GET') {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }

  // DELETE the file
  else if (url === '/delete' && method === 'GET') {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error deleting file');
      }
      res.writeHead(200);
      res.end('File deleted successfully');
    });
  }

  // DEFAULT route
  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>Node File Management Tool using core modules</h2>
      <ul>
        <li><a href="/create">Create File</a></li>
        <li><a href="/read">Read File</a></li>
        <li><a href="/delete">Delete File</a></li>
      </ul>
    `);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
