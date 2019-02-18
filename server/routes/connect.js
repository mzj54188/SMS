// 引入mysql模块
const mysql = require('mysql');
// 创建连接对象
const connection=mysql.createConnection({
    host:'localhost',//数据库地址
    user:'root',
    password:'root',
    database:'sms'
});
// 执行连接
connection.connect(()=>{
    console.log("数据库连接成功！");
});
// 暴露全局
module.exports=connection;