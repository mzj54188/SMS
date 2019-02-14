<template>
    <div class="inventorymanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存管理</span>
            </div>
            <!-- 内容部分 -->
            <div class="inventoryContent">
                <!-- 选择分类  和  关键字 -->
                <div class="inventoryTop">
                    <el-form :inline="true" :model="inventoryForm" class="demo-form-inline">
                        <!-- 下拉框 -->
                        <el-form-item>
                        <el-select v-model="inventoryForm.region" placeholder="===选择分类===">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        </el-form-item>
                        <!--  关键字-->
                        <el-form-item label="关键字">
                        <el-input v-model="inventoryForm.user"></el-input>
                        </el-form-item>
                        <!--  -->
                        <el-form-item>
                        <span>（商品名称；条形码）</span>
                        <el-button type="success" @click="keywordSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 商品列表 -->
                <div class="goodsList">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="goodsBarCode" label="商品条形码"></el-table-column>
                        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                        <el-table-column prop="goodsCategory" label="进价"></el-table-column>
                        <el-table-column prop="goodsPrice" label="入库"></el-table-column>
                        <el-table-column prop="goodsPromotedPrice" label="库存"></el-table-column>
                        <el-table-column prop="goodsMarketPrice" label="已售"></el-table-column>
                        <!-- 管理 -->
                        <el-table-column fixed="right" label="管理" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">
                                <i class="el-icon-delete" @click="goodsDelete"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页效果 -->
                <div class="goodsPagination">
                    <el-pagination background layout="prev, pager, next" :total="30"></el-pagination>
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
        inventoryForm: {
            user: "",
            region: ""
        },
        //   商品列表中的数据
        tableData: [
            {
                goodsBarCode: "6911989262550",
                goodsName: "海飞丝去屑洗发水",
                goodsCategory: "7.00",
                goodsPrice: "10",
                goodsPromotedPrice: "5",
                goodsMarketPrice: "5"
            },
            {
                goodsBarCode: "6911989262549",
                goodsName: "茅台酒",
                goodsCategory: "150.00",
                goodsPrice: "10",
                goodsPromotedPrice: "6",
                goodsMarketPrice: "4"
            },
            {
                goodsBarCode: "6911989262549",
                goodsName: "龙凤呈祥2",
                goodsCategory: "1.33",
                goodsPrice: "10",
                goodsPromotedPrice: "10",
                goodsMarketPrice: "0"
            },
            {
                goodsBarCode: "6911989262549",
                goodsName: "龙凤呈祥",
                goodsCategory: "8.16",
                goodsPrice: "2",
                goodsPromotedPrice: "2",
                goodsMarketPrice: "0"
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
.inventorymanage {
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
    .inventoryContent {
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