var express = require('express');
var router = express.Router();

// 引入数据库模块
const connection=require("./connect");
// 引入jwt
const jwt = require('jsonwebtoken');
// 定义秘钥
const secretKey = 'OMGJay';

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
    // 设置响应头 解决跨域
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

router.post('/checklogin', (req, res) => {
    // 接收用户名和密码
    let {username, password} = req.body;
    // 构造sql（查询用户名和密码是否存在）
    const sqlStr = `select * from account where username='${username}' and password='${password}'`;
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 判断
      if (!data.length) {  // 如果不存在
        res.send({'error_code': 1, 'reason': '请检查用户名或密码!'})
      } else { // 存在
        // 当前登录账号数据
        const obj = data[0];
        // 转为字符串
        const objStr = JSON.stringify(obj);
        // 生成一个全新对象
        const accountInfo = JSON.parse(objStr);
        // 生成token
        const token = jwt.sign(accountInfo, secretKey, {expiresIn: 60 * 60}) 
        res.send({
          'error_code': 0,
          'reason': '欢迎进入华联后台管理卡系统！',
          token,
          "username":accountInfo.username
        })
      }
    })
  })

module.exports = router;
