const fs = require('fs');
const readStream = fs.createReadStream('./docs/blog1.txt');
const writeStream = fs.createWriteStream('./docs/blog3.txt');
// readStream.on('data', (chunk) => {
//     writeStream.write(chunk);

// })

readStream.pipe(writeStream);