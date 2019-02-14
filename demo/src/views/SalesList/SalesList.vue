<template>
  <div class="saleslist">
    <el-card class="box-card">
      <!-- 卡片标题 -->
      <div slot="header" class="clearfix">
        <span>销售明细</span>
      </div>
      <!-- 卡片内容部分 -->
      <div>开始时间：
        <el-date-picker v-model="beginDate" type="date" placeholder="开始时间"></el-date-picker>结束时间：
        <el-date-picker v-model="overDate" type="date" placeholder="结束时间"></el-date-picker>
        <!-- 关键字一行 -->
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="关键字">
            <el-input v-model="keyword" placeholder="关键字"></el-input>
          </el-form-item>

          <span class="description">商品名称，订单号，客户名字，会员卡号</span>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 商品列表 -->
        <div class="goodsList">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="orderNumber" label="订单号"></el-table-column>
            <el-table-column prop="goodsName" label="名称"></el-table-column>
            <el-table-column prop="goodsNumber" label="数量"></el-table-column>
            <el-table-column prop="goodsActualPrice" label="实际售价"></el-table-column>
            <el-table-column prop="goodsPromotedPrice" label="优惠（促销/会员）"></el-table-column>
            <el-table-column prop="goodsRefund" label="退款"></el-table-column>
            <el-table-column prop="salesTime" label="销售时间"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="goodsPagination">
          <el-pagination background layout="prev, pager, next, jumper" :total="1000"></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 开始时间
      beginDate: "",
      // 结束时间
      overDate: "",
      //   关键字查询
      keyword: "",
      //   商品列表
      tableData: [
        {
          orderNumber: "02171514583337",
          goodsName: "海飞丝去屑洗发水",
          goodsNumber: "3",
          goodsActualPrice: "24",
          goodsPromotedPrice: "2.00元/无",
          goodsRefund: "无退款",
          salesTime: "2012-02-17"
        },
        {
          orderNumber: "02171514583337",
          goodsName: "海飞丝去屑洗发水",
          goodsNumber: "3",
          goodsActualPrice: "24",
          goodsPromotedPrice: "2.00元/无",
          goodsRefund: "无退款",
          salesTime: "2012-02-17"
        },
        {
          orderNumber: "02171514583337",
          goodsName: "海飞丝去屑洗发水",
          goodsNumber: "3",
          goodsActualPrice: "24",
          goodsPromotedPrice: "2.00元/无",
          goodsRefund: "无退款",
          salesTime: "2012-02-17"
        }
      ],
      // 分页
      currentPage: 1
    };
  },
  methods: {
    onSubmit() {
      alert("查询关键字");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="less">
.saleslist {
  .el-card {
    //   卡片内容部分
    .el-card__body {
      // 商品列表
      .goodsList {
        margin-bottom: 40px;
        margin-top: 10px;
        border-bottom: 1px solid #ccc;
      }
      // 关键字一行 ========
      .el-form {
        margin-top: 20px;
        border-bottom: solid 1px #ccc;
        .description {
          line-height: 40px;
        }
      }
      text-align: left;
    }
    // 销售明细=====标题
    .el-card__header {
      text-align: left;
    }
  }
}
</style>