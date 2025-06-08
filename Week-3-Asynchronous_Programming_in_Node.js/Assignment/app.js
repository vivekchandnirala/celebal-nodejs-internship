const fs = require('fs');

// Callback style
function readFileCallback() {
  fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    console.log('Callback Output:', data);
  });
}

// Promise style
function readFilePromise() {
  const fsp = require('fs').promises;
  fsp.readFile('sample.txt', 'utf8')
    .then(data => {
      console.log('Promise Output:', data);
    })
    .catch(err => {
      console.log('Error:', err);
    });
}

// Async/Await style
async function readFileAsync() {
  const fsp = require('fs').promises;
  try {
    const data = await fsp.readFile('sample.txt', 'utf8');
    console.log('Async/Await Output:', data);
  } catch (err) {
    console.log('Error:', err);
  }
}

// Call any one function to test
// readFileCallback();
// readFilePromise();
readFileAsync();
