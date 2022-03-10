/*
 * byte sequence(array)를 표현하는데 사용
 * 문자열의 인코딩 변환, base64의 활용 등에 많이 사용된다.
 */


// Buffer.alloc : 초기화를 동반하여 지정한 사이즈만큼 메모리를 할당. 두번째 인자를 지정하지 않는 경우 0로 초기화됨
const default_buffer = Buffer.alloc(10, 0);
const str_buffer = Buffer.alloc(10, 'a');
const num_buffer = Buffer.alloc(10, 1);

// Buffer.allocUnsafe : 사용가능한 메모리를 빠르게 할당하는 용도. 초기화가 이루어지지 않기때문에 사용시 주의 필요.
const unsafe_buffer = Buffer.allocUnsafe(16);


console.log(default_buffer);
console.log(unsafe_buffer);
console.log(str_buffer);
console.log(num_buffer);

console.log(Buffer.from('key setting', 'utf8'));
console.log(Buffer.from('key setting', 'utf16le'));
console.log(Buffer.from('1634', 'hex'));


/*
 * 문자열의 base64 변환 샘플 코드
 */
let orgText = "base64 로 변환하기 위한 기본 문자열";
console.log(`* base64 : 기본 문자열 : ${orgText}`)

// 문자열을 utf8로 디코딩 후 해당 buffer sequence를 base64로 인코딩하여 string 변환
let base64Text = Buffer.from(orgText, "utf8").toString('base64');
console.log(`* base64 : base64 문자열 : ${base64Text}`)

// base64로 인코딩된 문자열을 base64 형식으로 디코딩 후 해당 buffer sequence를 utf8로 인코딩하여 string 변환
let reorgText = Buffer.from(base64Text, "base64").toString('utf8');
console.log(`* base64 : 원복 문자열 : ${reorgText}`)