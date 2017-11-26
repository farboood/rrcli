#!/usr/bin/env node

/*
 * ===============
 * Modules Import
 * ===============
 */
const readline = require('readline');
const Do = require('./Do');

/*
 * ===============
 * Initial modules
 * ===============
 */
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

/*
 * ===============
 * Header Message
 * ===============
 */
console.log('React-Native Redux Command-Line');
console.log('===================');
console.log('');

/*
 * ===============
 * Choices
 * ===============
 */
let d = new Do();

d.actionsList.forEach(action => {
  console.log(action.id + '. ' + action.name);
});

rl.question('action number : ', answer => {
  rl.pause();
  d.action(rl, parseInt(answer));
});
