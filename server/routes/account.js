// 账号管理路由
const express=require("express");
const router=express.Router();

// 引入连接数据库模块
const connection=require("./connect");
// 统一设置响应头 解决跨域
router.all('*',(req,res,next)=>{
    // 响应头
    res.header('Access-Control-Allow-Origin', '*');
    next();
})


// 添加账号
router.post("/accountadd",(req,res)=>{
    // 解构
    let {username,password,usergroup} = req.body;
    console.log("接收前端发送过来的数据：",username,password,usergroup);

    // 增加（插入）数据  增加数据的sql语句
    const sqlStr=`insert into account(username,password,usergroup) values('${username}','${password}','${usergroup}')`;

    // 执行sql语句
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;  //抛出错误
        // 判断受影响的行数
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"插入数据成功！"});//向前端返回成功的数据对象
        }else{
            res.send({"error_code":1,"reason":"插入数据失败！"});
        }
    })
})
// 显示账号列表
router.get("/accountlist",(req,res)=>{
    const sqlStr=`select * from account order by ctime desc`;
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        // 把查询到的数据响应给前端
        res.send(data);
    })
})
// 分页
router.get('/accountlistbypage', (req, res) => {
    // 接收前端参数
    let {pageSize, currentPage} = req.query;
    // 默认值
    pageSize = pageSize ? pageSize : 3;
    currentPage = currentPage ? currentPage : 1
  
    // 构造sql语句 （查询所有数据 按照时间排序）
    let sqlStr = `select * from account order by ctime desc`;
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 计算数据总条数
      let total = data.length;
      // 分页条件 (跳过多少条)
      let n = (currentPage - 1) * pageSize;
      // 拼接分页的sql语句
      sqlStr += ` limit ${n}, ${pageSize}`;
      // 执行sql语句 （查询对应页码的数据）
      connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
        res.send({
          total,
          data
        })
      })
    })
})

//删除账号
router.get("/accountdel",(req,res)=>{
    // 接收ID
    let {id}=req.query;
    const sqlStr=`delete from account where id=${id}`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        //根据删除结果判断
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"删除成功！"});
        }else{
            res.send({"error_code":1,"reason":"删除失败！"});
        }
    })
})

// 编辑账号
router.get("/accountedit",(req,res)=>{
    // 接收Id
    let {id}=req.query;
    const sqlStr=`select * from account where id=${id}`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        // 把查询的数据返回给前端
        res.send(data);
    })
})
// 保存修改
router.post("/accounteditsave",(req,res)=>{
    // 接收新数据 和 原来的id
    let {username,usergroup,editId}=req.body;
    const sqlStr=`update account set username='${username}', usergroup='${usergroup}' where id=${editId}`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"编辑成功"});
        }else{
            res.send({"error_code":1,"reason":"编辑失败"});
        }
    })
})
// 批量删除
router.get('/batchdelete', (req, res) => {
    // 接收前端发送过来的 需要删除的id 数一个数组
    let { selectedId } = req.query;
    // 构造sql语句
    const sqlStr = `delete from account where id in (${selectedId})`;
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 根据删除结果判断 成功就返回成功的数据对象 否则 就返回失败的数据对象
        if (data.affectedRows > 0) {
            res.send({"error_code": 0, "reason":"批量删除成功"})
        } else {
            res.send({"error_code": 1, "reason":"批量删除失败"})
        }
    })
})
// 验证原密码
router.get("/checkOldPwd",(req,res)=>{
    let {oldPwd,username}=req.query;
    const sqlStr=`select * from account where username='${username}' and password='${oldPwd}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.length) { // 如果查询出数据 证明正确
          res.send({"error_code": 0, "reason":"旧密码正确!"});
        } else { // 否则就是不正确
          res.send({"error_code": 1, "reason":"旧密码错误!"})
        }
    })
})
// 保存新密码
router.post("/savenewpwd",(req,res)=>{
    let {username, oldPassword, newPassword} = req.body;
    const sqlStr=`update account set password='${newPassword}' where username='${username}' and password='${oldPassword}'`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.affectedRows>0){
            res.send({"error_code": 0, "reason":"密码修改成功!请重新登录!"})
        } else {
            res.send({"error_code": 1, "reason":"密码修改失败!"})
        }
    })
})

module.exports = router;

