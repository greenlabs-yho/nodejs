/*
 * 비동기 리소스를 추적할 때 사용하는 함수
 * 실험단계의 기능 
 * 
 * 호출 결과
 * >> Before setTimeout: asyncId: 1
 * INIT: asyncId: 6 / type: Timeout / trigger: 1  // 작업요청자의 id 와 실제 callback 의 id 가 달라진다.
 * >> After setTimeout: asyncId: 1
 * >> Callback setTimeout: asyncId: 6
 * DESTROY: asyncId: 6
 */

const fs = require('fs');
const async_hooks = require('async_hooks');

// console.log 가 비동기이기때문에 동작에 혼선이 발생하므로 아래 함수로 대체
const log = (str) => fs.writeSync(1, `${str}\n`);

// async_hooks 생성
async_hooks.createHook( {
    init(asyncId, type, triggerAsyncId) {
        log(`INIT: asyncId: ${asyncId} / type: ${type} / trigger: ${triggerAsyncId}`);
    },
    // before/after 의 경우는 sql/http 요청의 경우 사용할 수 있다. 0-n 호출된다.(setTimeout의 경우는 0)
    before(asyncId) {
        log(`Before: asyncId: ${asyncId}`);
    },
    after(asyncId) {
        log(`After: asyncId: ${asyncId}`);
    },
    destroy(asyncId) {
        log(`DESTROY: asyncId: ${asyncId}`);
    },
}).enable();


// test
log(`>> Before setTimeout: asyncId: ${async_hooks.executionAsyncId()}`);
setTimeout(() => {
    log(`>> Callback setTimeout: asyncId: ${async_hooks.executionAsyncId()}`);
}, 2000);
log(`>> After setTimeout: asyncId: ${async_hooks.executionAsyncId()}`);