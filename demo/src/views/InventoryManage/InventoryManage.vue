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
                        <!-- 单选框 -->
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column prop="barcode" label="商品条形码"></el-table-column>
                        <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                        <el-table-column prop="number" label="数量"></el-table-column>
                        <el-table-column prop="price" label="进价"></el-table-column>
                        <!-- 日期 -->
                        <el-table-column label="创建日期">
                            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                        </el-table-column>
                        <!-- 管理 -->
                        <el-table-column fixed="right" label="管理">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini">
                                    <i class="el-icon-edit" @click="goodsEdit"></i> 编辑
                                </el-button>
                                <el-button type="danger" size="mini">
                                    <i class="el-icon-delete" @click="goodsDelete"></i> 删除
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
// 引入moment模块
import moment from 'moment';
import qs from 'qs';
export default {
    data() {
        return {
            //   下拉框  ======选择分类
            inventoryForm: {
                user: "",
                region: ""
            },
            //   商品列表中的数据
            tableData: []
        };
    },
    created(){
        this.getInventoryList();
    },
    methods: {
        // 数据函数
        getInventoryList(){
            this.axios.get("http://127.0.0.1:777/stock/stocklist")
            .then(response=>{
                // 把后端返回的数据赋值给表格
                this.tableData=response.data;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        // 通过关键字查询
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
    },
    // 过滤器
    filters:{
        // 过滤时间函数
        filterCtime(ctime){
            return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
        }
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