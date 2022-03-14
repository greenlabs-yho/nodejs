/*
 * node-schedule
 * https://www.npmjs.com/package/node-schedule
 */
const schedule = require('node-schedule');

// 3초마다 실행되는 job 생성
// */3 대신 3으로 명시하면 각 분의 3초에 실행되는 걸로 설정됨. 그 외 설정법은 많음.
// 공식홈페이지 참조.
let cnt = 0;
const job = schedule.scheduleJob('*/3 * * * * *', (fireDate) => {
    console.log(`[${module.NODE_ENV}] It's scheduled. fireDate : ${fireDate}`)

    if (++cnt > 2) {
        // reject promise 가 발생하면 error emitter 가 실행
        return Promise.reject("reject Promise")
    }

    // 등록한 success 이벤트에게 전달.
    // v2.1.0 부터 지원되는 기능
    return Promise.resolve("resolved Promise")
})

// job 실행 후 동작
job.on('run', () => {
    console.log('run')
})

// job 실행 전 동작
job.on('scheduled', () => {
    console.log('scheduled')
})

// job.canceled 호출시 동작
job.on('canceled', () => {
    console.log('canceled')
})

// reject Promise 가 발생하면 동작
job.on('error', (value) => {
    console.log('error : ', value)
})

// v2.1.0 부터 지원되는 기능
// resolved Promise 나 정상적으로 호출되면 동작
job.on('success', (value) => {
    console.log('success : ', value)
})


// 종료 요청시 처리
process.on('SIGINT', () => {
    job.cancel();
    console.log("server closed");
    process.exit(0);
})