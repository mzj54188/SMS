<template>
    <div class="passwordmodifi">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改账号密码</span>
            </div>
            <div class="text item">
                <!-- 账号管理表单 -->
                <el-form :model="passwordModifyForm" status-icon :rules="rules" ref="passwordModifyForm" label-width="100px" class="demo-ruleForm">
                    <!-- 原密码 -->
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="text" v-model="passwordModifyForm.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 新密码 -->
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="text" v-model="passwordModifyForm.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 确认新密码 -->
                    <el-form-item label="确认新密码" prop="checkNewPwd">
                        <el-input type="text" v-model="passwordModifyForm.checkNewPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 修改按钮&重置按钮 -->
                    <el-form-item>
                        <el-button type="success" @click="submitForm('passwordModifyForm')">修改</el-button>
                        <el-button @click="resetForm('passwordModifyForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    
    // 验证新密码的函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 5 || value.length > 10) {
        callback(new Error("新密码长度 5 - 10 位"));
      } else {
        if (this.passwordModifyForm.checkNewPwd !== "") {
          // 如果确认密码不为空
          this.$refs.passwordModifyForm.validateField("checkNewPwd"); // 调用确认密码的验证（一致性验证）
        }
        // 成功回调
        callback();
      }
    };
    // 确认新密码的验证函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordModifyForm.newPassword) {
        callback(new Error("输入密码不一致"));
      }
      callback();//成功调用
    };
    // 验证原密码
    const checkOldPwd=(rule,value,callback)=>{
      // 获取当前登录账号
      let username=window.localStorage.getItem("username");
      // 把用户输入的原密码发给后端，匹配数据库中的密码是否一致
      this.axios.get(`http://127.0.0.1:777/account/checkOldPwd?oldPwd=${value}&username=${username}`)
      .then(response=>{
        // 接收后端错误码 和 信息提示
        let {error_code,reason}=response.data;
        if(error_code===0){
          callback();
        }else{
          callback(new Error(reason));
        }
      })
      .catch(err=>{
        console.log(err);
      })
    };
    return {
      // 密码修改的数据
      passwordModifyForm: {
        oldPassword:"",
        newPassword:"",
        checkNewPwd:""
      },
      // 验证的规则（一份数据）
      rules: {
        // 验证原密码
        oldPassword: [
          { required: true, validator: checkOldPwd, trigger: "blur" }
        ],
        // 验证新密码
        newPassword: [
          // 非空验证
          { required: true, validator: pass, trigger: "blur" }
        ],
        // 验证确认新密码
        checkNewPwd: [
          // 自定义验证函数
          { required: true, validator: checkPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击修改按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          let params = {
            username: window.localStorage.getItem("username"),
            oldPassword: this.passwordModifyForm.oldPassword,
            newPassword: this.passwordModifyForm.newPassword
          };
          // 发送到后端
          this.axios.post("http://127.0.0.1:777/account/savenewpwd",qs.stringify(params))
          .then(response=>{
            // 接收后端错误码 和 信息提示
            let {error_code,reason}=response.data;
            if(error_code===0){
              window.localStorage.removeItem("token");
              this.$message({
                type:"success",
                message:reason
              })
              this.$router.push("/login")
            }else{
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
      // this.$refs.passwordModifyForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less">
.passwordmodifi {
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
                }
            }
        }
    }
}
</style>