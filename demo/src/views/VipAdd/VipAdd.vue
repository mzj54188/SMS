<template>
    <div class="vipadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加编辑账号</span>
            </div>
            <div class="vaddContent">
                <div class="vaddTop">
                    <el-form :model="vaddForm" status-icon :rules="rules" ref="vaddForm" class="demo-ruleForm">
                        <!-- 真实姓名 -->
                        <el-form-item label="真实姓名:" prop="name">
                            <el-input v-model="vaddForm.name"></el-input>
                        </el-form-item>
                        <!-- 会员卡卡号 -->
                        <el-form-item label="会员卡卡号:" prop="vipCard">
                            <el-input v-model="vaddForm.vipCard"></el-input>
                        </el-form-item>
                        <!-- 用户组 -->
                        <el-form-item label="用户组:" prop="userGroup">
                            <el-select v-model="vaddForm.userGroup" placeholder="请选择用户组">
                                <el-option label="普通用户" value="普通用户"></el-option>
                                <el-option label="高级管理员" value="高级管理员"></el-option>
                                <el-option label="高级管理员" value="超级管理员"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 身份证号 -->
                        <el-form-item label="身份证号:" prop="idCard">
                            <el-input v-model="vaddForm.idCard"></el-input>
                        </el-form-item>
                        <!-- 用户状态 -->
                        <el-form-item label="用户状态:">
                            <el-radio v-model="radio" label="1">启用</el-radio>
                            <el-radio v-model="radio" label="2">禁用</el-radio>
                        </el-form-item>
                        <!-- 手机号码 -->
                        <el-form-item label="手机号码:" prop="tel">
                            <el-input v-model="vaddForm.tel"></el-input>
                        </el-form-item>
                        <!-- 座机号码 -->
                        <el-form-item label="座机号码:" prop="seatNumber">
                            <el-input v-model="vaddForm.seatNumber"></el-input>
                        </el-form-item>
                        <!-- 邮箱地址 -->
                        <el-form-item label="邮箱地址:" prop="emailAdress">
                            <el-input v-model="vaddForm.emailAdress"></el-input>
                        </el-form-item>
                        <!-- 地区选择 -->
                        <el-form-item label="地区选择:" prop="regionalChoice">
                            <el-cascader
                                expand-trigger="hover"
                                :options="options"
                                v-model="selectedOptions2"
                                @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                         <!-- 详细地址 -->
                        <el-form-item label="详细地址:" prop="dress">
                            <el-input v-model="vaddForm.dress"></el-input>
                        </el-form-item>
                         <!-- 邮政编码 -->
                        <el-form-item label="邮箱地址:" prop="postalCode">
                            <el-input v-model="vaddForm.postalCode"></el-input>
                        </el-form-item>
                        <!-- 添加 -->
                        <el-form-item>
                            <el-button type="success" @click="keywordSearch">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: "1",
            vaddForm: {
                name:"",
                vipCard:"",
                userGroup:"",
                idCard: "",
                tel: "",
                seatNumber:"",
                emailAdress:"",
                regionalChoice:"",
                dress:"",
                postalCode:""
            },
            options: [{
                value: 'sichuan',
                label: '四川省',
                children: [{
                    value: 'chengdushi',
                    label: '成都市',
                    children: [{
                    value: 'wuhouqu',
                    label: '武侯区'
                    }, {
                    value: 'jinniuqu',
                    label: '金牛区'
                    }, {
                    value: 'gaoxinqu',
                    label: '高新区'
                    }, {
                    value: 'qingyangqu',
                    label: '青羊区'
                    }]
                }, {
                    value: 'dazhoushi',
                    label: '达州市',
                    children: [{
                    value: 'tongchuanqu',
                    label: '通川区'
                    }, {
                    value: 'dachuanqu',
                    label: '达川区'
                    }]
                }]
                }, {
                value: 'shanghai',
                label: '上海',
                children: [{
                    value: 'shanghaishi',
                    label: '上海市',
                    children: [{
                    value: 'pudongxinqu',
                    label: '浦东区'
                    }, {
                    value: 'minhangqu',
                    label: '闵行区'
                    }, {
                    value: 'xujiahui',
                    label: '徐家汇'
                    }, {
                    value: 'hongkouqu',
                    label: '虹口区'
                    }, {
                    value: 'jiadingqu',
                    label: '嘉定区'
                    }]
                }]
            }],
            selectedOptions: [],
            selectedOptions2: [],
            rules: {
                //  1:所属分类
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                vipCard: [
                    { required: true, message: "请输入会员卡卡号", trigger: "blur" }
                ],
                userGroup: [
                    { required: true, message: "请选择用户组", trigger: "change" }
                ],
            }
        }
    },
    methods: {
        keywordSearch() {
            alert("添加!");
        },
        handleChange(value) {
            console.log(value);
        }
    }
}
</script>
<style lang="less">
.vipadd {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      text-align: left;
    }
    .el-card__header {
      text-align: left;
    }
    .el-form {
        width: 290px;
    }
  }
}
</style>