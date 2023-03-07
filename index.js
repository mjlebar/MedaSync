// This file starts off the process of reading the file by either taking it as an argument from the command line or prompting the user for it

const { argv, stdin: input, stdout: output } = require("node:process");
// gets any arguments passed on the command line for us. Also allows us to use stdin and stdout

const { readFile } = require("./readFile");

if (argv.length > 2) {
  // We only want to get arguments passed to the command line. If there are none we will have argv.length=2
  for (let i = 2; i < argv.length; i++) {
    readFile(argv[i]);
  }
} else {
  // So, otherwise we get the function by prompting the user

  const readline = require("node:readline");
  const rl = readline.createInterface({ input, output });
  // allows us to read get user response for the file name - don't want to open this if the file is passed in at the command line
  rl.question("What is the name of the file to be processed? \n", (answer) => {
    readFile(answer, rl);
  });
}
