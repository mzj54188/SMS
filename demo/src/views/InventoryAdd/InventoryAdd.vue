<template>
    <div class="inventoryadd">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品入库</span>
        </div>
        <div class="text item">
          <!-- 进货管理表单 -->
          <el-form :model="inventoryForm" status-icon :rules="rules" ref="inventoryForm" label-width="100px" class="demo-ruleForm">
              <!-- 商品条形码 -->
              <el-form-item label="商品条形码" prop="barcode">
                  <el-input type="text" v-model="inventoryForm.barcode" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 商品名称 -->
              <el-form-item label="商品名称" prop="goodsname">
                  <el-input type="text" v-model="inventoryForm.goodsname" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 数量 -->
              <el-form-item label="数量" prop="number">
                  <el-input type="text" v-model="inventoryForm.number" autocomplete="off"></el-input>
                  <div>记重商品单位为千克</div>
              </el-form-item>
              <!-- 进价 -->
              <el-form-item label="进价" prop="price">
                  <el-input type="text" v-model="inventoryForm.price" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 登录按钮&重置按钮 -->
              <el-form-item>
                  <el-button type="success" @click="submitForm('inventoryForm')">入库</el-button>
                  <el-button @click="resetForm('inventoryForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
</template>
<script>
// 引入qs
import qs from "qs";
export default {
    data() {

    // 验证数量的函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入数量"));
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("数量为1 - 10 位"));
      } else {
        // 成功回调
        callback();
      }
    };

    // 进价的验证函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入进价"));
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("进价为1 - 10 位"));
      } else {
        // 成功回调
        callback();
      }
    };
    

    return {
      // 表单的数据
      inventoryForm: {
        barcode: "",
        goodsname:"",
        number: "",
        price: ""
      },
      // 验证的规则（一份数据）
      rules: {
        // 验证用户名
        barcode: [
          // 非空验证
          { required: true, message: "请输入商品条形码", trigger: "blur" },
          { min: 5, max: 7, message: "请输入5 - 7 位商品条形码", trigger: "blur" }
        ],
        // 商品名称
        goodsname: [
          // 非空验证
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位商品名称", trigger: "blur" }
        ],
        // 数量
        number: [
          // 非空验证
          { required: true, validator: pass, trigger: "blur" }
        ],
        // 进价
        price: [
          // 自定义验证函数
          { required: true, validator: checkPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          let params = {
            barcode: this.inventoryForm.barcode,
            goodsname: this.inventoryForm.goodsname,
            number: this.inventoryForm.number,
            price: this.inventoryForm.price
          };
          // 发送数据给后台
          this.axios.post("http://127.0.0.1:777/stock/inventoryadd",qs.stringify(params))
          .then(response=>{
            console.log(response.data);
            // 接收后端返回的错误码 和 提示信息
            let {error_code,reason}=response.data;
            if(error_code===0){
              // 弹出成功提示
              this.$message({
                type:"success",
                message:reason
              })
              // 跳转到库存管理
              this.$router.push("/inventorymanage")
            }else{
              // 弹出失败提示
              this.$message.error(reason);
            }
          })
          .catch(err=>{
            console.log(err);
          })
        } else {
          return false;
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      // this.$refs.inventoryForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less">
.inventoryadd {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
        text-align: left;
      .el-form {
        width: 290px;
        .el-form-item {
          margin-bottom: 24px;
          margin-top: 24px;
          .el-form-item__label{
            text-align: left;
          }
          .el-button{
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>