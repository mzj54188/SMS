<template>
    <div class="accountadd">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加账号</span>
        </div>
        <div class="text item">
          <!-- 账号管理表单 -->
          <el-form :model="accountForm" status-icon :rules="rules" ref="accountForm" label-width="100px" class="demo-ruleForm">
              <!-- 账号 -->
              <el-form-item label="账号" prop="username">
                  <el-input type="text" v-model="accountForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="密码" prop="password">
                  <el-input type="text" v-model="accountForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 确认密码 -->
              <el-form-item label="确认密码" prop="checkPwd">
                  <el-input type="text" v-model="accountForm.checkPwd" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 选择用户组 -->
              <el-form-item label="选择用户组" prop="usergroup">
                  <el-select v-model="accountForm.usergroup" placeholder="请选择用户组">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="高级管理员" value="高级管理员"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                  </el-select>
              </el-form-item>
              <!-- 登录按钮&重置按钮 -->
              <el-form-item>
                  <el-button type="success" @click="submitForm('accountForm')">添加</el-button>
                  <el-button @click="resetForm('accountForm')">重置</el-button>
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
    // 包含特殊字符的函数
    const checkSpecificKey = str => {
        var specialKey =
          "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
        for (var i = 0; i < str.length; i++) {
          if (specialKey.indexOf(str.substr(i, 1)) != -1) {
            return false;
          }
        }
        return true;
    };

    // 验证密码的函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 5 || value.length > 10) {
        callback(new Error("密码长度 5 - 10 位"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.accountForm.checkPwd !== "") {
          // 如果确认密码不为空
          this.$refs.accountForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
        }
        // 成功回调
        callback();
      }
    };

    // 确认密码的验证函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountForm.password) {
        callback(new Error("输入密码不一致"));
      }
      callback();//成功调用
    };

    return {
      // 表单的数据
      accountForm: {
        username: "",
        password: "",
        checkPwd: "",
        usergroup:""
      },
      // 验证的规则（一份数据）
      rules: {
        // 验证用户名
        username: [
          // 非空验证
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "账号长度在 3 - 5 位", trigger: "blur" }
        ],
        // 验证密码
        password: [
          // 非空验证
          { required: true, validator: pass, trigger: "blur" }
        ],
        // 验证确认密码
        checkPwd: [
          // 自定义验证函数
          { required: true, validator: checkPass, trigger: "blur" }
        ],
        usergroup:[
          {required:true,message: "请选择用户组", trigger: "change"}
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
            username: this.accountForm.username,
            password: this.accountForm.password,
            usergroup: this.accountForm.usergroup,
          };
          // axios发送数据给后台
          this.axios.post("/account/accountadd",params)
            .then(response=>{
              console.log(response);
              // 接收后端返回的错误码 和 提示信息
              let {error_code,reason}=response;
              if(error_code===0){
                // 弹出成功提示
                this.$message({
                  type: 'success',
                  message: reason
                });
                //跳转到账号管理
                this.$router.push("/accountmanage")
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
      // this.$refs.accountForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less">
.accountadd {
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