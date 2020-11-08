const fs = require('fs');              // file utilities
const auth = require('./auth.json');   // authentication token

fs.readdir('./tests/', (err, files) => {
  files.forEach(file => {
    console.log(`** Testing ${file.split('.')[0]} **`);
    require(`./tests/${file}`);

  })
})
