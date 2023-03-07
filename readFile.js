const fs = require("fs");
const { processInput } = require("./processInput");

function readFile(file, readline) {
  if (readline) {
    //   the optional parameter here is passed if we got the file name from stdin - if we did, we want to make sure to close the input to end the program. We can do this as soon as readFile is called
    readline.close();
  }
  return new Promise((resolve, reject) => {
    //   the promise here allows us to wait for the return value when testing
    fs.readFile(file, (err, data) => {
      if (err) {
        console.log(`Sorry, that file can't be found: `);
        console.log(err);
        reject(err);
      } else {
        resolve(processInput(data.toString().split(/\r?\n/)));
        // breaks up the input file by line, then sends it to be processed
      }
    });
  });
}

module.exports = { readFile };
