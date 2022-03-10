/*
 * 다른 프로그램을 실행하고 싶거나 shell 명령어를 수행하고 싶을 때 해당 모듈을 사용하여 수행
 */


const { spawn, exec } = require('child_process');

// shell 명령어 실행 후 결과를 처리하는 예제
// 비동기로 /usr 폴더에서 ls 를 실행한 결과를 받아온다.
const ls = spawn('ls', ['-lh', '/usr']);  

ls.stdout.on('data', (data) => {
    console.log(`child process stdout: ${data}`);  
});

ls.stderr.on('data', (data) => {
  console.error(`child process: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


// 별도의 node 를 실행시킨 결과를 처리하는 예제
const exe_proc = spawn('node', ['hello-world.js']);  

exe_proc.stdout.on('data', (data) => {
  console.log(`child process stdout: ${data}`);  
});

exe_proc.stderr.on('data', (data) => {
  console.error(`child process stderr: ${data}`);
});

exe_proc.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});