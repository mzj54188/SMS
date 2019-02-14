<template>
    <div class="passwordmodifi">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改账号密码</span>
            </div>
            <div class="text item">
                <!-- 账号管理表单 -->
                <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="passwordForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPwd">
                        <el-input type="text" v-model="passwordForm.checkPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 登录按钮&重置按钮 -->
                    <el-form-item>
                        <el-button type="success" @click="submitForm('passwordForm')">修改</el-button>
                        <el-button @click="resetForm('passwordForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
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
        if (this.passwordForm.checkPwd !== "") {
          // 如果确认密码不为空
          this.$refs.passwordForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
        }
        // 成功回调
        callback();
      }
    };
    // 确认密码的验证函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.password) {
        callback(new Error("输入密码不一致"));
      }
      callback();//成功调用
    };
    return {
      // 密码修改的数据
      passwordForm: {
        password: "",
        checkPwd: ""
      },
      // 验证的规则（一份数据）
      rules: {
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
    // 点击修改按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          alert("添加成功！");
          let params = {
            username: this.passwordForm.username,
            password: this.passwordForm.password
          };
          // 直接跳转到后端主页
          this.$router.push("/");
        } else {
          alert("添加失败，请重新输入！");
          return false;
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      // this.$refs.passwordForm.resetFields() 获取整个表单组件 调用重置方法
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