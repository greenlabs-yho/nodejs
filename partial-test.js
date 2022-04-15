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

const chkParam = data => {
  return data + '1';
}

const addSales = (param1, param2) => {
  param2 = chkParam(param2)
  console.log(param1, param2);
}

addSales('a', 'b')




const add = (a, b) => a + b;
module.exports = { convertNumberToLocale, add }



const ObjConstructor = Object().constructor;
const convertTypeToString = (value) => {
  if (!value || !value.constructor) return value;
  
  if (ObjConstructor === value.constructor) {
    // object 타입인 경우
    Object.keys(value).forEach((key) => {
      // object 내 value 가 object 나 array 타입인 경우 재귀호출
      // string 외의 다른 데이터 타입인 경우 string 변환
      if (!value[key] || value[key] === 'NaN') {
        value[key] = '';
      } else if (Array.isArray(value[key]) || ObjConstructor === value[key].constructor) {
        convertTypeToString(value[key]);
      } else if (typeof value !== 'string') {
        // eslint-disable-next-line no-param-reassign
        value[key] = value[key].toString();
      }
    });
  } else if (Array.isArray(value)) {
    // array 타입인 경우
    value.forEach((row, index) => {
      // object 타입이면 재귀호출
      if (!row || row === 'NaN') {
        value[index] = '';
      } else if (Array.isArray(row) || ObjConstructor === row.constructor) {
        convertTypeToString(row);
      } else {
        // 그 외 타입이면 바로 string 처리
        // eslint-disable-next-line no-param-reassign
        value[index] = row.toString();
      }
    });
  }
};

const value = {'a': 111, 'b': 'NaN', 'c': [1, 2, null], 'd': [{'aa': 11, 'bb': '22'}, {'aa': 12, 'bb': '23'}], 'e': {'aaa': 1, 'bbb': '2'}, 'f': null, 'g': NaN, 'h': undefined};


console.log(JSON.stringify(value));
convertTypeToString(value);
console.log(JSON.stringify(value));

