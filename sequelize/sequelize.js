const { result } = require('lodash');
const {Sequelize, DataTypes, Model, Op} = require('sequelize');

// 연결 URI 설정.
// sqlite 의 in-memory db 를 활용하여 샘플코드를 구성해보자.
let sequelize = new Sequelize('sqlite::memory:', {
    //logging: console.log, // default, 로그함수의 첫번째 인자를 노출.
    logging: (...msg) => console.log(msg)  // 모든 로그함수의 파라미터를 노출
});

(async () => {
        
    // test connection 시도.
    try {
        // 연결테스트를 위해 사용되는 메서드이며 내부적으로 select 1+1 as result 를 수행함.
        await sequelize.authenticate();
        console.log('테스트 연결 성공');
    } catch (error) {
        console.error('DB에 연결 할 수 없음.', error);
    }

    /*
     * declare Model 1
     */
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: DataTypes.STRING,
    }, {
        tableName: 'Books' // 모델명과 실제 물리테이블명을 다르게 사용하는 경우
    });

    /*
     * declare Model 2
     */
    class Member extends Model {}
    Member.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: DataTypes.INTEGER,
        address: DataTypes.STRING
    }, { 
        sequelize,  // Sequelize 인스턴스를 전달하여 연결한다.
        modelName: 'Member',
        freezeTableName: true // 모델명과 실제 물리테이블명을 같게 설정하고 싶은 경우
    })

    /*
     * Table 생성
     */
    await Book.sync({
        // 기본 : 없으면 생성.
        // force: true // 있으면 삭제 후 생성 // 테스트 시에만 사용할것
        // alter: true // 있으면 변경된 정보를 매칭하는 작업을 함. 
    });

    await Member.sync({});
    // await sequelize.sync();  // 전체 모델 동기화


    /*
     * Insert
     */
    const bookList = []
    // 정의한 Model 형식에 맞는 개체만 생성
    const book1 = Book.build({name: "나는 매주 시체를 보러간다", author: "유성호"})
    // 생성된 개체를 DB에 저장
    await book1.save();
    bookList.push(book1);

    // await create = build + await save
    const book2 = await Book.create({name: "규칙 없음", author: "리드 헤이스팅스"})
    bookList.push(book2);

    bookList.push(await Book.create({name: "보통의 언어들", author: "김이나"}));
    
    // 생성한 model 객체를 logging 할 때에는 toJSON() 함수나, JSON.stringify() 를 이용한다.
    bookList.forEach(book => {
        console.log(book.toJSON());
    })

    const member = await Member.create({name: "김길동", age: 17, address: '서울시'});
    console.log(JSON.stringify(member, null, 4));

    /*
     * Update
     */
    member.set({
        name: "박길동", age: 19
    })
    await member.update({address: "제주시"}); // update 함수에 명시한 필드만 db에 저장
    // await member.save({address: "제주시"}); // 동일하게 동작
    await member.reload();  // db 에서 데이터를 다시 읽어온다.
    console.log("updated", JSON.stringify(member, null, 4));

    member.set({
        name: "박길동", age: 19
    })
    member.address = "부산시"
    await member.save();  // member 객체에 변경된 모든 것을 db에 저장
    console.log("updated", JSON.stringify(member, null, 4));

    // 현재 DB에 있는 값을 기준으로 수치값을 증감한다. Model이 갖고있는값 기준이 아님.
    const decMember = await member.decrement('age', {by: 3});
    await member.reload() // postgresql 의 경우 reload 를 호출하지 않아도 갱신한 값이 return 됨
    console.log("decresed ", JSON.stringify(decMember, null, 4));

    /*
     * Delete
     */
    await bookList.pop().destroy();   

    /*
     * SELECT
     * https://sequelize.org/v6/manual/model-querying-basics.html#applying-where-clauses
     * 각종 where 조건의 상세 방법론은 위의 reference 에서 참조.
     */
    let reloadBookList = await Book.findAll();
    console.log("all books", JSON.stringify(reloadBookList, null, 2));

    reloadBookList = await Book.findAll({
        // 조회할 컬럼 지정
        attributes: [
            'name', 
            ['author', 'writer'],  // 컬럼의 alias 지정
            [Sequelize.fn('COUNT', Sequelize.col('createdAt')), 'cnt'], // 집계함수, alias
        ],
        // where 조건 지정
        // where (id in (1, 2) and id >= 1) and name like '%없%' and length(author) > 2
        where: {
            id: {  
                [Op.and]: {
                    [Op.or]: [1, 2],
                    [Op.gte]: 1
                }
            },
            name: {
                [Op.like]: '%없%'
            },
            [Op.and]: [
                Sequelize.where(sequelize.fn('length', sequelize.col('author')), {
                    [Op.gt]: 2
                    })
            ]
        }
    });
    
    console.log("filtered books", JSON.stringify(reloadBookList, null, 2));

    // 데이터 1개만 조회
    reloadBookList = await Book.findOne({
        where: {
            id: 1,
            author: "유성호"
        }
    });
    console.log("select one book", JSON.stringify(reloadBookList, null, 2));
    
    
    /*
     * Update using where
     */
    let effectedRows = await Book.update({author: "리드 헤이스팅스 외 1인"}, {
        where :{id: 2}
    })
    reloadBookList = await Book.findOne({
        where: {id: 2}
    });
    console.log(`update book (${effectedRows[0]}건)`, JSON.stringify(reloadBookList, null, 2));


    /*
     * Truncate Table
     */
    await Book.destroy({
        truncate: true
      });

    /*
     * Bulk Insert
     * bulkCreate 자체에 validate 하는 기능이 없으므로 Modeling 할 때 validate 를 명시하고
     * bulkCreate 호출시에는 validate 옵션에 true 를 설정하도록 한다.
     */
    const Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {args: true, msg: 'name is not null'},
                len: {gte: 1}
            }
        },
        nation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {args: true, msg: 'nation is not null'}
            }
        }
    }, {
        freezeTableName: true
    });
    await Movie.sync();

    // validate 설정 없이 데이터 bulk 삽입
    await Movie.bulkCreate([
        {name: '물랑루즈', nation: '미국'},
        {name: '', nation: "일본"}
    ]);
    let bulkMovie = await Movie.findAll()
    console.log('no validate: ', JSON.stringify(bulkMovie, null, 2))

    await Movie.truncate();

    // validate 설정하여 데이터 bulk 삽입. => 오류 발생
    await Movie.bulkCreate([
        {name: '물랑루즈', nation: '미국'},
        //{name: '냉정과 열정사이', nation: "일본"}
        {nation: "일본"}
    ], {
        validate: true
    }).catch(err => {
        // 오류 발생시 처리는?
        console.error(err.toString())
    });
    bulkMovie = await Movie.findAll()
    console.log('validate: ', JSON.stringify(bulkMovie, null, 2))

    // 아래부터 시작하면 됨.
    // https://sequelize.org/v6/manual/model-querying-basics.html#ordering-and-grouping

})().catch(e => {
    console.log(e);
}).finally(async () => {
    await sequelize.close();
    sequelize = null;
});