<template>
  <div class="goodsreturn">
    <el-card class="box-card">
      <!-- 卡片头部内容 -->
      <div slot="header" class="clearfix">
        <span>商品退货</span>
      </div>
      <!-- 卡片身体 -->
      <div>
        <!--  注意：表单验证里面绑定数据必须为对象形式的数据！！！！！在el-form里面必须绑定一个数据对象:model="a"-->
        <el-form :inline="true" class="demo-form-inline" :rules="rules" :model="a">
          <el-form-item label="订单号：" prop="goodsreturn">
            <el-input v-model="a.goodsreturn"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="orderSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 商品退货
      a: {
        goodsreturn:"",
      },
      // 表单验证
      rules: {
        goodsreturn: [
          { required: true, message: "请输入订单号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    orderSearch() {
      alert("订单查询");
    }
  }
};
</script>
<style lang="less">
.goodsreturn {
  .el-card {
    //   卡片身体
    .el-card__body {
      text-align: left;
    }
    // 卡片头部样式
    .el-card__header {
      text-align: left;
      background: #ccc;
    }
  }
}
</style>