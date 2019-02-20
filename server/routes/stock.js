// 进货管理路由
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

//添加库存
router.post("/inventoryadd",(req,res)=>{
    let {barcode,goodsname,number,price}=req.body;
    console.log("接收前端发送过来的数据：",barcode,goodsname,number,price);
    const sqlStr=`insert into stock(barcode,goodsname,number,price) values('${barcode}','${goodsname}','${number}千克','${price}')`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"添加库存成功！"});
        }else{
            res.send({"error_code":1,"reason":"添加库存失败！"});
        }
    })
})
// 库存列表显示
router.get("/stocklist",(req,res)=>{
    const sqlStr=`select * from stock order by ctime desc`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        // 把查询到的数据响应给前端
        res.send(data);
    })
})
// 编辑库存列表
router.get("/inventoryedit",(req,res)=>{
    // 接收Id
    let {id}=req.query;
    const sqlStr=`select * from stock where id=${id}`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        // 把查询的数据返回给前端
        res.send(data);
    })
})
// 删除库存列表
router.get("/inventorydel",(req,res)=>{
    // 接收ID
    let {id}=req.query;
    const sqlStr=`delete from stock where id=${id}`;
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
// 保存修改
router.post("/inventoryeditsave",(req,res)=>{
    // 接收新数据 和 原来的id
    let {barcode,goodsname,number,price,editId}=req.body;
    const sqlStr=`update stock set barcode='${barcode}', goodsname='${goodsname}', number='${number}', price='${price}' where id=${editId}`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"编辑成功"});
        }else{
            res.send({"error_code":1,"reason":"编辑失败"});
        }
    })
})
// 分页
router.get('/stocklistbypage', (req, res) => {
    // 接收前端参数
    let {pageSize, currentPage} = req.query;
    // 默认值
    pageSize = pageSize ? pageSize : 3;
    currentPage = currentPage ? currentPage : 1
  
    // 构造sql语句 （查询所有数据 按照时间排序）
    let sqlStr = `select * from stock order by ctime desc`;
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

module.exports = router;