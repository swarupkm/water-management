
require('@babel/register');
const fs = require('fs');
const { default: CommandSession } = require('./src/CommandSession');
const filePath = process.argv[2];

const fileContents = fs.readFileSync(filePath, {encoding: 'utf-8'}).split('\n');
const session = new CommandSession();
for (let eachLine of fileContents) {
  const [command, ...args] = eachLine.split(' ');
  session.handle(command, args)
}