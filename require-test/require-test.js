// require 시 폴더 경로를 지정하면 index.js 를 참조함
const md = require('.')

console.log(md.data_index);
console.log(md.data_controller)


const controller = require('./controller');
console.log(controller.test);
controller.func();