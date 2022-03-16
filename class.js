// proxy 를 활용한 동적 getter 로 다른 getter 명에 해당하는 
// 다른 모듈의 함수 호출한 결과 dictionary 에 관리하는 클래스

let numbering = 1;
const sequelizeDict = {}

class SequelizeManager {
    constructor(dbName) {
        if (!(dbName in sequelizeDict)) {
            sequelizeDict[dbName] = "sequelize" + numbering;
        }
        this.sequelize = sequelizeDict[dbName];
        this.modelDict = {}

        this.models = new Proxy(this, {
            get(target, name, receiver) {
                if (!(name in target.modelDict)) {
                    const dynamicModelFunc = require(`./class-sample/${name}`)
                    if (dynamicModelFunc) {
                        target.modelDict[name] = dynamicModelFunc()
                    }
                }

                return target.modelDict[name];
            }
        })
    }
}

const s = new SequelizeManager('dbName');

console.log(s.models.plan);
console.log(s.models.topic);
console.log(s.models.user);
