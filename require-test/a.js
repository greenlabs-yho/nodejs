console.log('a start');
exports.done = false;

const c = require('./c');

const b = require('./b');
console.log("A파일에서 실행한 B:", b);
console.log(`in a, b.don = ${b.done}`);
exports.done = true;
console.log('a end');

module.exports.a = () => {
    console.log("A파일로부터의 console log");
  };