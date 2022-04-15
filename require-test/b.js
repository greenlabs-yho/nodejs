console.log('b start');
exports.done = false;

const a = require('./a');
console.log("B파일에서 실행한 a:", a);
console.log(`in b, a.don = ${a.done}`);
exports.done = true;
console.log('b end');

module.exports.b = () => {
    console.log("B파일로부터의 console log");
  };