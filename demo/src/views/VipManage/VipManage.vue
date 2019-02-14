<template>
    <div class="vipmanage">
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会员管理</span>
            </div>
             <div class="inventoryContent">
                <!-- 搜索 -->
                <div class="inventoryTop">
                    <el-form :inline="true" :model="vipForm" class="demo-form-inline">
                        <!-- 搜索 -->
                        <el-form-item label="搜索">
                        <el-input v-model="vipForm.user"></el-input>
                        </el-form-item>
                        <!--  -->
                        <el-form-item>
                        <span>会员卡、会员名、电话、手机</span>
                        <el-button type="success" @click="keywordSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 商品列表 -->
                <div class="vipList">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="vipCard" label="会员卡卡号"></el-table-column>
                        <el-table-column prop="vipName" label="会员姓名"></el-table-column>
                        <el-table-column prop="vipGrade" label="会员等级"></el-table-column>
                        <el-table-column prop="vipIntegral" label="会员积分"></el-table-column>
                        <el-table-column prop="discount" label="折扣"></el-table-column>
                        <el-table-column prop="tel" label="手机号"></el-table-column>
                        <el-table-column prop="seatNumber" label="座机号"></el-table-column>
                        <!-- 管理 -->
                        <el-table-column fixed="right" label="管理" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">
                                <i class="el-icon-edit" @click="vipDelete"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页效果 -->
                <div class="vipPagination">
                    <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
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
        vipForm: {
            user: "",
            region: ""
        },
        //   商品列表中的数据
        tableData: [
            {
                vipCard: "222",
                vipName: "GGGG",
                vipGrade: "铜牌会员",
                vipIntegral: "218",
                discount: "50%",
                tel: "1531",
                seatNumber:"1231"
            },
            {
                vipCard: "111",
                vipName: "KKK",
                vipGrade: "普通会员",
                vipIntegral: "0",
                discount: "99%",
                tel: "1531",
                seatNumber:"1231"
            }
        ]
        };
    },
    methods: {
        //   通过关键字查询
        keywordSearch() {
            alert("查询!");
        },
        // 商品列表====
        // 编辑商品
        vipEdit() {
            alert("编辑商品");
        },
        // 删除商品
        vipDelete() {
            alert("删除商品");
        }
    }
}
</script>
<style lang="less">
.vipmanage {
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
      // 分页
      .vipPagination {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: left;
      }
    
    .el-card__header {
      text-align: left;
    }
  }
}
</style>