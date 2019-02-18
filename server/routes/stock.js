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


module.exports = router;