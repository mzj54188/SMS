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
                                <el-button type="primary" size="mini" @click="goodsEdit(scope.row.id)">
                                    <i class="el-icon-edit"></i> 编辑
                                </el-button>
                                <el-button type="danger" size="mini" @click="goodsDelete(scope.row.id)">
                                    <i class="el-icon-delete"></i> 删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 模态框 -->
                    <el-dialog title="库存编辑" width="400px" :visible.sync="flag">
                        <!-- 回填表单 -->
                        <el-form :model="editForm"  label-width="60px">
                            <!-- 商品条形码 -->
                            <el-form-item label="商品条形码" prop="barcode">
                                <el-input style="width: 217px;" type="text" v-model="editForm.barcode" autocomplete="off"></el-input>
                            </el-form-item>
                            <!-- 商品名称 -->
                            <el-form-item label="商品名称" prop="goodsname">
                                <el-input style="width: 217px;" type="text" v-model="editForm.goodsname" autocomplete="off"></el-input>
                            </el-form-item>
                            <!-- 数量 -->
                            <el-form-item label="数量" prop="number">
                                <el-input style="width: 217px;" type="text" v-model="editForm.number" autocomplete="off"></el-input>
                            </el-form-item>
                            <!-- 进价 -->
                            <el-form-item label="进价" prop="price">
                                <el-input style="width: 217px;" type="text" v-model="editForm.price" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <!-- 表单的尾部 -->
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="flag = false">取 消</el-button>
                            <el-button type="primary" @click="saveEdit">确 定</el-button>
                        </div>
                    </el-dialog> 
                    <!-- 分页效果 -->
                    <div style="margin-top: 20px; text-align: left;">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 3, 5, 10, 20, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
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
            editForm:{
                barcode:"",
                goodsname:"",
                number:"",
                price:""
            },
            inventoryForm: {
                user: "",
                region: ""
            },
            //   商品列表中的数据
            tableData: [],
            flag:false,
            editId:"",
            currentPage: 1, // 当前页
            total: 0, // 数据总条数
            pageSize: 3 // 每页条数
        };
    },
    created(){
        this.getInventoryListByPage();
    },
    methods: {
        // 数据函数
        // getInventoryList(){
        //     this.axios.get("http://127.0.0.1:777/stock/stocklist")
        //     .then(response=>{
        //         // 把后端返回的数据赋值给表格
        //         this.tableData=response.data;
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        // },
        getInventoryListByPage () {
            // 收集当前页码 和 每页显示条数
            let pageSize = this.pageSize;
            let currentPage = this.currentPage;
            let params = {
                 pageSize,
                currentPage
            };
            // 发送ajax请求 把分页数据发送给后端
            this.axios.get('/stock/stocklistbypage',
                params)
            .then(response => {
                console.log('对应页码的数据:', response)
                // 接收后端返回的数据总条数 total 和 对应页码的数据 data
                let {total, data} = response;
                // 赋值给对应的变量即可
                this.total = total;
                this.tableData = data;
                // 如果当前页没有数据 且 排除第一页
                if ( !data.length && this.currentPage !== 1) {
                    // 页码减去 1
                    this.currentPage -= 1;
                    // 再调用自己
                    this.getInventoryListByPage();
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        // 每页显示条数改变 就会触发这个函数
        handleSizeChange(val) {
            // 保存每页显示的条数
            this.pageSize = val;
            // 调用分页函数
            this.getInventoryListByPage();
        },
        // 当前页码改变 就会触发这个函数
        handleCurrentChange(val) {
            // 保存当前页码
            this.currentPage = val;
            // 调用分页函数
            this.getInventoryListByPage();
        },
        // 通过关键字查询
        keywordSearch() {
            alert("关键字查询!");
        },
        // 编辑库存列表
        goodsEdit(id) {
            // 保存修改数据的ID
            this.editId=id;
            // 显示模态框
            this.flag=true;
            // id发给后端
            this.axios.get(`/stock/inventoryedit`,{id})
            .then(response=>{
                let result=response[0];
                // 回填表单
                this.editForm.barcode=result.barcode;
                this.editForm.goodsname=result.goodsname;
                this.editForm.number=result.number;
                this.editForm.price=result.price;
                // 显示模态框 (回填数据之后)
                this.flag = true;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        // 删除库存列表
        goodsDelete(id) {
            this.$confirm('你确定要删除吗？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>{
                this.axios.get(`/stock/inventorydel`,{id})
                .then(response=>{
                    // 接收后端返回的错误码 和 提示信息
                    let {error_code,reason}=response;
                    if(error_code===0){
                        // 删除成功的提示
                        this.$message({
                            type: "success",
                            message: reason
                        });
                        this.getInventoryListByPage();
                    }else{
                        // 删除失败的提示
                        this.$message.error(reason);
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
        },
        // 保存修改
        saveEdit(){
            // 收集新数据 和 原来的id
            let params={
                barcode:this.editForm.barcode,
                goodsname:this.editForm.goodsname,
                number:this.editForm.number,
                price:this.editForm.price,
                editId:this.editId
            }
            // 把新数据 和 原来的id 发送给后端
            this.axios.post("/stock/inventoryeditsave",params)
            .then(response=>{
                let {error_code,reason}=response;
                if(error_code === 0){
                    // 弹出成功的提示
                    this.$message({
                        type: 'success',
                        message: reason
                    })
                    // 刷新列表（重新请求所有账号数据）
                    this.getInventoryListByPage();
                }else{
                     // 弹出失败的提示
                    this.$message.error(reason);
                }
                // 关闭模态框
                this.flag=false;
            })
            .catch(err=>{
                console.log(err);
            })
        }
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