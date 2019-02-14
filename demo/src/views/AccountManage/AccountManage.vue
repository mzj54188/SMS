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
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">
                                <i class="el-icon-edit"></i> 编辑
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">
                                <i class="el-icon-delete"></i>  删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                username: "admin",
                usergroup: "超级管理员"
                },
                {
                username: "OMG",
                usergroup: "超级管理员"
                },
                {
                username: " IG",
                usergroup: "高级管理员"
                },
                {
                username: "EDG",
                usergroup: "普通用户"
                }
            ]
        };
    },
    methods: {
        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        handleEdit() {},
        handleDelete() {}
    }
}
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