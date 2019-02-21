<template>
    <div class="accountmanage">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="text item">
                <!-- 账号管理表格 -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <!-- 单选框 -->
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    
                    <!-- 账号 -->
                    <el-table-column
                    prop="username"
                    label="账号"
                    >
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                    prop="usergroup"
                    label="用户组"
                    >
                    </el-table-column>

                    <!-- 日期 -->
                    <el-table-column
                    label="创建日期"
                    >
                        <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                    </el-table-column>

                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="handleEdit(scope.row.id)">
                                <i class="el-icon-edit"></i> 编辑
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete"></i>  删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
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
                <!-- 批量删除按钮 & 取消选择按钮 -->
                <div style="margin-top: 20px; text-align: left;">
                  <el-button @click="batchDelete">批量删除</el-button>
                  <el-button @click="cancelSelect()">取消选择</el-button>
                </div>
                <!-- 模态框 -->
                <el-dialog title="账号编辑" width="400px" :visible.sync="flag">
                    <!-- 回填表单 -->
                    <el-form :model="editForm"  label-width="60px">
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="username">
                            <el-input style="width: 217px;" type="text" v-model="editForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 选中用户组 -->
                        <el-form-item label="用户组" prop="usergroup">
                            <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                            <el-option label="普通用户" value="普通用户"></el-option>
                            <el-option label="高级管理员" value="高级管理员"></el-option>
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <!-- 表单的尾部 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="flag = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </div>
                </el-dialog> 
            </div>
        </el-card>
    </div>
</template>
<script>
// 引入moment模块
import moment from "moment";
import qs from "qs";

export default {
  data() {
    return {
      tableData: [],
      flag: false,
      editForm: {
        username: "",
        usergroup: ""
      },
      editId: "",
      selectedAccount: [], // 被选中的账号数据
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 3 // 每页条数
    };
  },
  // 生命周期的钩子函数
  created() {
    //自动发送请求，获取账户数据
    this.getAccountListByPage();
  },
  methods: {
    // 请求账户数据函数
    // getAccountList(){
    //     this.axios.get("http://127.0.0.1:777/account/accountlist")
    //     .then(response=>{
    //         //把后端返回的数据赋值给表格数据
    //        this.tableData=response.data;
    //     })
    //     .catch(err=>{
    //        console.log(err);
    //    })
    // },

    getAccountListByPage() {
      // 收集当前页码 和 每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      let params = {
        pageSize,
        currentPage
      };
      // 把页码数据存入浏览器的本地存储中
      window.localStorage.setItem("pageSize", pageSize);
      window.localStorage.setItem("currentPage", currentPage);
      // 发送ajax请求 把分页数据发送给后端
      this.axios
        .get("/account/accountlistbypage", params)
        .then(response => {
          console.log("对应页码的数据:", response);
          // 接收后端返回的数据总条数 total 和 对应页码的数据 data
          let { total, data } = response;
          // 赋值给对应的变量即可
          this.total = total;
          this.tableData = data;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getAccountListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 每页显示条数改变 就会触发这个函数
    handleSizeChange(val) {
      // 保存每页显示的条数
      this.pageSize = val;
      // 调用分页函数
      this.getAccountListByPage();
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getAccountListByPage();
    },
    handleSelectionChange(val) {
      this.selectedAccount = val;
    },
    // 批量删除
    batchDelete() {
      // 收集删除账号的id
      let selectedId = this.selectedAccount.map(v => v.id);
      // 用户什么都不选
      if (!selectedId.length) {
        this.$message.error("请选择再使用此操作!");
        return;
      }
      // 确认框
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 把删除账号数据的id发送给后端
          this.axios
            .get(`/account/batchdelete`, {
              params: {
                selectedId
              }
            })
            .then(response => {
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                // 弹出成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.getAccountListByPage();
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 弹出取消删除的提示
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 取消选中
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    // 删除账号
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`/account/accountdel`, { id })
            .then(response => {
              // 接收后端返回的错误码 和 提示信息
              let { error_code, reason } = response;
              if (error_code === 0) {
                // 删除成功的提示
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountListByPage();
              } else {
                // 删除失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑账号
    handleEdit(id) {
      // 保存修改数据的ID
      this.editId = id;
      // 显示模态框
      this.flag = true;
      // id发给后端
      this.axios
        .get(`/account/accountedit`, { id })
        .then(response => {
          let result = response[0];
          // 回填表单
          this.editForm.username = result.username;
          this.editForm.usergroup = result.usergroup;
          // 显示模态框 (回填数据之后)
          this.flag = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改
    saveEdit() {
      // 收集新数据 和 原来的id
      let params = {
        username: this.editForm.username,
        usergroup: this.editForm.usergroup,
        editId: this.editId
      };
      // 把新数据 和 原来的id 发送给后端
      this.axios
        .post("/account/accounteditsave", params)
        .then(response => {
          let { error_code, reason } = response;
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
            // 刷新列表（重新请求所有账号数据）
            this.getAccountListByPage();
          } else {
            // 弹出失败的提示
            this.$message.error(reason);
          }
          // 关闭模态框
          this.flag = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // 过滤器
  filters: {
    // 过滤时间函数
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.accountmanage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>