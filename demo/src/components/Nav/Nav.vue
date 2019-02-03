<template>
     <el-menu 
        background-color="#2d3a4b" 
        unique-opened
        active-text-color="rgb(64, 158, 255)"
        :default-active="this.$route.path"
        router
        >
        <!-- 系统管理 -->
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item index="/">系统信息</el-menu-item>
        </el-submenu>
        <!-- 账号管理 -->
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>账号管理</template>
                <el-menu-item index="/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/PasswordModifi">密码修改</el-menu-item>
        </el-submenu>
        <!-- 商品管理 -->
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                <el-menu-item index="/goodsadd">添加商品</el-menu-item>
                <!-- ！！=================有问题 -->
                <el-menu-item index="/goodsmanage">商品管理</el-menu-item>

        </el-submenu>
        <!-- 进货管理 -->
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-goods"></i>进货管理</template>
                <el-menu-item index="/inventorymanage">库存管理</el-menu-item>
                <el-menu-item index="/inventoryadd">添加库存</el-menu-item>
        </el-submenu>
        <!-- 出货管理 -->
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-sold-out"></i>出货管理</template>
                <el-menu-item index="/saleslist">销售列表</el-menu-item>
                <el-menu-item index="/goodsout">商品出库</el-menu-item>
                <el-menu-item index="/goodsreturn">商品退货</el-menu-item>
        </el-submenu>
        <!-- 会员管理 -->
        <el-submenu index="6">
            <template slot="title"><i class="el-icon-star-on"></i>会员管理</template>
                <el-menu-item index="/vipadd">添加账号</el-menu-item>
                <el-menu-item index="/vipmanage">账号管理</el-menu-item>
        </el-submenu>
        <!-- 统计管理 -->
        <el-submenu index="7">
            <template slot="title"><i class="el-icon-date"></i>统计管理</template>
                <el-menu-item index="/salestatistics">销售统计</el-menu-item>
                <el-menu-item index="/incomstatistics">进货统计</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {};
</script>
<style lang="less">
.el-menu {
  border: none;
  .el-submenu {
    .el-submenu__title {
      color: #fff;
    }
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>


