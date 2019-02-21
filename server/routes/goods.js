var express = require('express');
var router = express.Router();

// 引入连接数据库的模块
const connection = require('./connect');

// // 引入express-jwt 用于验证token
// const expressJwt = require('express-jwt');
// // 引入jwt
// const jwt = require('jsonwebtoken');
// // 定义秘钥
// const secretKey = 'itsource';


// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求头
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
})

// // 使用模块 express-jwt 验证token
// router.use(expressJwt({
//   secret: secretKey
// }).unless({
//   path: ['/login/checklogin']  // 不需要验证token的地址
// }));

// //拦截器
// router.use((err, req, res, next) => {
//   //当token验证失败时会抛出如下错误
//   if (err.name === 'UnauthorizedError') {
//     //这个需要根据自己的业务逻辑来处理
//     res.status(401).send('无效的token 未授权...');
//   }
// });

// ========商品添加的功能========  接收 /goodsadd
router.post('/goodsadd', (req, res) => {
  // res.send('123')
  // 接收前端发送的数据
  let { category,
    barcode,
    name,
    price,
    marketPrice,
    purchasePrice,
    storageNumber,
    weight,
    unit,
    discount,
    promotion,
    desc } = req.body;
  // 把数据存入数据库(node能和数据库连起来的原因：在connnet.js中有localhost，引入了connect模块)
  // 1：先构造sql语句（往数据库中添加数据）
  const sqlStr = `
  insert into goods
 (goodsGroup,goodsBarCode,goodsName,goodsPrice,goodsMarketPrice,goodsPurchasePrice,storageNumber,goodsWeight,goodsUnit,vipOffer,ifPromote,goodsDesc) 
  values(?,?,?,?,?,?,?,?,?,?,?,?)`

  // 参数
  const sqlParams = [
    category, barcode, name, price, marketPrice, purchasePrice, storageNumber, weight, unit, discount, promotion, desc
  ]
  // 2:执行sql语句（数据库模块来执行，固定形式）
  connection.query(sqlStr, sqlParams, (err, data) => {
    if (err) throw err;
    // console.log(data)
    if (data.affectedRows > 0) {   //插入失败   ===证明被影响的数据至少有一行,把数据存入数据库中
      res.send({ 'error_code': 0, 'message': '数据插入成功' })
    } else {                      //插入失败
      res.send({ 'error_code': 1, 'message': '数据插入失败' })
    }
  })
})


// ========查询商品数据=======     接收  /getGoodsListByPage
router.get('/getGoodsListByPage', (req, res) => {
  // 获取前端发送过来的数据（每页数据条数  &&  当前页码）
  let { pageSize, currentPage, category, keyWord } = req.query;
  console.log(category, keyWord)

  // 默认值()
  pageSize = pageSize ? pageSize : 2;
  currentPage = currentPage ? currentPage : 1;
  // 1:构造sql语句
  let sqlStr = `select * from goods where 1=1`
  // 2:执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // console.log('数据1',data)
    // 从数据库输出的数据总条数为
    let total = data.length;

    // ==============================
    // 条件判断  从而进行相关sql语句的拼接
    if (category !== '' && category !== '全部') {
      // 这是查询特定类别的情况
      sqlStr += ` and goodsGroup='${category}'`     //加引号加引号！！
    }

    // 关键字 判断
    if (keyWord !== '') {
      sqlStr += ` and (goodsName like "%${keyWord}%" or goodsBarCode like '%${keyWord}%')`
    }

    // 再次查询数据  按照查询的条件，重新计算数据的总数据
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      total = data.length;
      console.log('总数据条数',total)
    })

    // 每页的数据
    // 分页条件(跳过多少条数据)
    let n = (currentPage - 1) * pageSize;   //这里不要加引号！！
    sqlStr += ` limit ${n},${pageSize}`;  //注意：limit后面要留一个空格
    // 再次执行sql语句
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      console.log(data)
      res.send({
        total,
        data
      })

    })

  })
})


// ========删除商品功能========     接收  /goodsDelete
router.get('/goodsDelete', (req, res) => {
  // 接收前端传入的id参数的值
  let { id } = req.query;
  // 1:构造sql语句
  const sqlStr = `delete from goods where id=${id}`
  // 2:执行构造sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 根据被影响的行  来判断是否被删除
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "message": "数据删除成功" });
    } else {
      res.send({ "error_code": 1, "message": "数据删除失败" });

    }
  })
})


//========= 编辑功能的实现======》》》数据回填     接收  /goodsEdit 
router.get('/goodsEdit', (req, res) => {
  // 接收前端传过来的  id 
  // res.send('1321')
  let { id } = req.query;
  // console.log(id)
  // 1：构造sql语句（在数据库查找数据）
  const sqlStr = `select * from goods where id=${id} `
  // // 2:执行sql语句(connection字母不要写成connnection！！！！！)
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
})


// ======== 编辑功能的实现======》》》保存编辑      接收  /saveEdit
router.post('/saveEdit', (req, res) => {
  // 接收前端传过来的数据
  // 接收前端发送的数据
  let { category,
    barcode,
    name,
    price,
    marketPrice,
    purchasePrice,
    storageNumber,
    weight,
    unit,
    discount,
    promotion,
    desc,
    goodsEditId } = req.body;
  // console.log(goodsEditId)
  // 1:构造sql修改语句
  // const sqlStr = `select * from goods where id=${goodsEditId}`;
  // console.log(sqlStr)
  // 这里要注意：修改的数据必须和数据库中的字节类型相同！！如果不同，服务器就会报错，甚至崩溃！！！！！
  const sqlStr = `update goods set 
  goodsGroup='${category}',
  goodsBarCode='${barcode}' ,
  goodsName='${name}' ,
  goodsPrice='${price}' ,
  goodsMarketPrice='${marketPrice}' ,
  goodsPurchasePrice='${purchasePrice}' ,
  storageNumber='${storageNumber}' ,
  goodsWeight='${weight}' ,
  goodsUnit='${unit}' ,
  vipOffer='${discount}' ,
  ifPromote='${promotion}' ,
  goodsDesc='${desc}' where id=${goodsEditId}`;   //最后一个参数后面不能写逗号！！！
  // console.log(sqlStr)
  // 2:执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // console.log('我是数据',data)
    if (data.affectedRows > 0) {    //数据库中有数据被改变
      // 发送  成功的数据对象给前端
      res.send({ 'error_code': 0, 'message': '商品信息修改成功' })
    } else {                       //没有数据被改变
      res.send({ 'error_code': 1, 'message': '商品信息修改失败' })
    }
  })
  // res.send('123')
})


//========= 批量删除功能的实现==========            接收 /batchDelete
router.get('/batchDelete', (req, res) => {
  // 接收前端传过来的要删除数据的 id数组
  let { batchDeleteId } = req.query;
  // console.log(batchDeleteId)
  // 1：构造sql语句    根据id来查找数据
  const sqlStr = `delete from  goods where id in (${batchDeleteId})`;  //注意语法不要写*号

  // console.log(sqlStr)
  // 2:执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // console.log(data)
    // 判断
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "message": "批量删除成功" })
    } else {
      res.send({ "error_code": 1, "message": "批量删除失败" })
    }
  })
})


// ========模糊查询功能的实现==========             接收  /searchGoods
router.get('/searchGoods', (req, res) => {
  // 接收前端传过来的参数
  let { category, keyWord } = req.query;
  // console.log('数据',category, keyWord)
  // 1:构造sql语句(下面要进行再次拼接sql语句的话，这里不能用const!!!)
  let sqlStr = `select * from goods where 1 = 1`;

  // 条件判断  从而进行相关sql语句的拼接
  if (category !== '' && category !== '全部') {
    // 这是查询特定类别的情况
    sqlStr += ` and goodsGroup='${category}'`     //加引号加引号！！
  }

  // 关键字 判断
  if (keyWord !== '') {
    sqlStr += ` and (goodsName like "%${keyWord}%" or goodsBarCode like '%${keyWord}%')`
  }
  // 2：执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
  // res.send('54')
})



module.exports = router;
