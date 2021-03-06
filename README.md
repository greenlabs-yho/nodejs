# nodejs
https://nodejs.org/download/release/v16.3.0/docs/api/index.html  
v16.3.0 공식문서에 있는 주요 기능에 대한 고찰

---

## ` description`


### http

- express 를 사용하지 않고 서버를 구동하는 가장 기본적인 형태의 코드

### async_hooks

- 비동기 리소스를 추적할 때 사용
- 비동기 리소스의 초기화, 정리, 구동전, 구동후 등에 비동기 id 를 활용하여 여러가지 추적작업 혹은 부가작업이 가능하다.

### buffer

- byte sequence(array)를 표현하는데 사용
- 문자열의 인코딩 변환, base64의 활용 등에 많이 사용된다.


### child_process
- 다른 프로그램을 실행하고 싶거나 shell 명령어를 수행하고 싶을 때 해당 모듈을 사용하여 수행 가능

--- 
## ` 주요 모듈`

### Sequelize (ORM)
- https://sequelize.org/v6/manual/model-querying-basics.html
- https://velog.io/@cadenzah/sequelize-document-3
- 위 사이트 기준으로 내용 확인하며 데모 코드 작성.
- 기본적인 사용법 위주로 주석과 함께 코드로 작성


### node-schedule
- https://www.npmjs.com/package/node-schedule
- 기본적인 전체 사용법 데모 코드 작성.
- v2.0.0 과 v2.1.0 이 success, error 발생부분에서 다르게 동작하니 주의
- v2.0.0 : exception 발생, rejected Promise 발생에 대하여 error emitter 실행
- v2.1.0 : exception 발생시 오류가 발생하여 프로그램 중지됨, success emitter 추가됨

--- 

## ` 작업 예정`

### Assert

- node js v16.3.0 문서의 절반정도의 많은 분량을 차지하고 있는 부분
- Jest 를 활용한 Test 코드의 원활한 작성을 위해서는 익숙해질 필요가 있음.
- 테스트 코드 및 샘플로직은 Jest study 진행할 때 추가할 예정

---
## ` 알아만 둡시다.`

### c++ addons
- C++ 로 작성된 라이브러리간의 인터페이스를 활용하여 Nodejs 모듈로 로드하여 사용
