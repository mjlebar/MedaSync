const fs = require("fs");
const { processInput } = require("./processInput");

async function readFile(file, readline) {
  //   the optional parameter here is passed if we got the file name from stdin - if we did, we want to make sure to close the input. We can do this as soon as readFile is called
  if (readline) {
    readline.close();
  }
  return new Promise((resolve, reject) => {
    //   the promise here allows us to wait for the return value, which is very helpful when testing
    fs.readFile(file, (err, data) => {
      if (err) {
        console.log(`Sorry, that file can't be found: `);
        reject(err);
        // If no such file exists, this alerts the user and gives a helpful error message
      } else {
        return resolve(processInput(data.toString().split(/\r?\n/)));
        // if we have a valid file, this breaks up the input file by line, then sends it to be processed
      }
    });
  });
}

module.exports = { readFile };
