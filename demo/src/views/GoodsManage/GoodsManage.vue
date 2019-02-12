<template>
  <div class="goodsmanage">
    <el-card class="box-card">
      <!-- 商品管理 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 内容部分 -->
      <div class="goodsContent">
        <!-- 选择分类  和  关键字 -->
        <div class="goodsTop">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- 下拉框 -->
            <el-form-item>
              <el-select v-model="formInline.region" placeholder="===选择分类===">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!--  关键字-->
            <el-form-item label="关键字">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item>
              <span>（商品名称；条形码）</span>
              <el-button type="primary" @click="keywordSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 商品列表 -->
        <div class="goodsList">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="goodsBarCode" label="商品条形码"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="goodsCategory" label="所属分类"></el-table-column>
            <el-table-column prop="goodsPrice" label="售价（元）"></el-table-column>
            <el-table-column prop="goodsPromotedPrice" label="促销价（元）"></el-table-column>
            <el-table-column prop="goodsMarketPrice" label="市场价（元）"></el-table-column>
            <el-table-column prop="goodsStock" label="库存"></el-table-column>
            <!-- 库存总额 -->
            <el-table-column prop="goodsStockPrice" label="库存总额"></el-table-column>
            <!-- 销售总额 -->
            <el-table-column prop="goodsSalePrice" label="销售总额"></el-table-column>
            <!-- 管理 -->
            <el-table-column fixed="right" label="管理" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  <i class="el-icon-edit" @click="goodsEdit"></i>
                </el-button>
                <el-button type="text" size="small">
                  <i class="el-icon-delete" @click="goodsDelete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页效果 -->
        <div class="goodsPagination">
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   下拉框  ======选择分类
      formInline: {
        user: "",
        region: ""
      },
      //   商品列表中的数据
      tableData: [
        {
          goodsBarCode: "6911989262549",
          goodsName: "我的优乐美",
          goodsCategory: "优乐美",
          goodsPrice: "2.00",
          goodsPromotedPrice: "未促销",
          goodsMarketPrice: "2.40",
          goodsStock: "0（缺）",
          goodsStockPrice: "0.00",
          goodsSalePrice: "0.00"
        },
        {
          goodsBarCode: "6911989262549",
          goodsName: "我的优乐美",
          goodsCategory: "优乐美",
          goodsPrice: "2.00",
          goodsPromotedPrice: "未促销",
          goodsMarketPrice: "2.40",
          goodsStock: "0（缺）",
          goodsStockPrice: "0.00",
          goodsSalePrice: "0.00"
        },
        {
          goodsBarCode: "6911989262549",
          goodsName: "我的优乐美",
          goodsCategory: "优乐美",
          goodsPrice: "2.00",
          goodsPromotedPrice: "未促销",
          goodsMarketPrice: "2.40",
          goodsStock: "0（缺）",
          goodsStockPrice: "0.00",
          goodsSalePrice: "0.00"
        }
      ]
    };
  },
  methods: {
    //   通过关键字查询
    keywordSearch() {
      alert("关键字查询!");
    },
    // 商品列表====
    // 编辑商品
    goodsEdit() {
      alert("编辑商品");
    },
    // 删除商品
    goodsDelete() {
      alert("删除商品");
    },
    // 分页效果
  }
};
</script>
<style lang="less">
.goodsmanage {
  .el-card {
    .goodsContent {
      // 分页
      .goodsPagination {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: left;
      }
      text-align: left;
      border-bottom: 1px solid #ccc;
    }
    .el-card__header {
      text-align: left;
    }
  }
}
</style>