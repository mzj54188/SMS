<template>
    <div class="login">
         <!-- 表单容器 -->
        <div class="login-wrapper">
            <!-- 标题 -->
            <h1 class="title">
                <i class="el-icon-loading"></i>
                华联超市管理系统-登录
            </h1>
            <!-- 登录表单 -->
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <!-- 账号 -->
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="text" v-model="loginForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 登录按钮&重置按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
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
        if (this.loginForm.checkPwd !== "") {
          // 如果确认密码不为空
          this.$refs.loginForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
        }
        // 成功回调
        callback();
      }
    };

    // 确认密码的验证函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("输入密码不一致"));
      }
      callback();//成功调用
    };

    return {
      // 登录表单的数据
      loginForm: {
        username: "",
        password: "",
        checkPwd: ""
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
        ]
      }
    };
  },
  methods: {
    // 点击登录按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          alert("验证成功！");
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          // 直接跳转到后端主页
          this.$router.push("/");
        } else {
          alert("验证失败，请重新输入！");
          return false;
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.login {
  height: 1000px;
  width: 100%;
  background-color: #2d3a4b;
  .login-wrapper {
    width: 500px;
    height: 350px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 30px 50px 0 10px;
    .title {
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
    }
    .el-form {
      .el-form-item {
        .el-form-item__label {
          color: #fff;
        }
      }
    }
  }
}
</style>
