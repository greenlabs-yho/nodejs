class EmptyDataError extends Error {
  // eslint-disable-next-line no-restricted-syntax
  constructor(message) {
    super(message || '조회 결과가 없습니다.');
    this.name = this.constructor.name;
    this.data = message || '조회 결과가 없습니다.';
    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, 'message', {
      enumerable: true
    })
  }
}

const error1 = new EmptyDataError('message');
const error2 = new EmptyDataError('에러발생!');
Object.defineProperty(error2, 'message', {
  enumerable: true
})
console.log(JSON.stringify(error1));
console.log(JSON.stringify(error2));
// Error : {}



const convertNumberToLocale = (value, colList) => {
    if (!value || !colList || !Array.isArray(colList)) return value;
  
    const objConstructor = {}.constructor;
    let arrayValule = value;
    if (objConstructor === value.constructor) {
      arrayValule = [value];
    }
  
    arrayValule.forEach(row => {
      colList.forEach(col => {
        row[col] = row[col] && row[col].toLocaleString('ko-KR');
      });
    });
  };



const data = {AR: 12345, STR: 'abc'};
const colList = ['AR',]
convertNumberToLocale(data, colList);
console.log(data);


const hashCode = (s) => s + ' 1111111';

console.log(hashCode('1234'));