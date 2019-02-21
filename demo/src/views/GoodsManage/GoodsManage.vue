<template>
  <div class="goodsmanage">
    <el-card class="box-card">
      <!-- 商品管理 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div style="text-align: left;">
        <!-- 搜索框 -->
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="所属分类">
            <el-select v-model="searchForm.goodsGroup" placeholder="所属分类">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="酒水类" value="酒水类"></el-option>
              <el-option label="水果类" value="水果类"></el-option>
              <el-option label="电子产品" value="电子产品"></el-option>
              <el-option label="母婴产品" value="母婴产品"></el-option>
              <el-option label="休闲零食" value="休闲零食"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 内容部分 -->
      <div class="goodsContent">
        <!-- 商品管理管理列表 -->
        <el-table
          ref="userlist"
          :data="goodsTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 选择框 -->
          <el-table-column type="selection"></el-table-column>
          <!-- 条形码 -->
          <el-table-column prop="goodsBarCode" label="条形码"></el-table-column>
          <!-- 商品名称 -->
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <!-- 所属分类 -->
          <el-table-column prop="goodsGroup" label="所属分类"></el-table-column>
          <!-- 售价 -->
          <el-table-column prop="goodsPrice" label="售价"></el-table-column>
          <!-- 是否存销 -->
          <el-table-column prop="goodsMarketPrice" label="市场价"></el-table-column>
          <el-table-column prop="goodsPurchasePrice" label="进价"></el-table-column>
          <el-table-column prop="goodsWeight" label="商品重量"></el-table-column>
          <el-table-column prop="ifPromote" label="是否促销"></el-table-column>
          <el-table-column prop="vipOffer" label="会员优惠"></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="goodsEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="goodsDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 批量删除按钮 -->
        <div style="margin-top: 20px;text-align: left;">
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
          <el-button @click="toggleSelection">取消选择</el-button>
        </div>
        <!-- 分页 -->
        <div style="margin-top: 20px; text-align: left;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
// 引入moment 事件格式化
import moment from "moment";
export default {
  data() {
    return {
      // 查询 中的数据
      searchForm: {
        goodsGroup: "",
        keyWord: ""
      },
      //   商品列表中的数据
      goodsTableData: [],
      // 批量选中的表格数据
      multipleSelection: [],
      // >>>当前页面
      currentPage: 1,
      // >>>每页条数
      pageSize: 2,
      // 数据总条数
      total: 0,
      // 编辑框中修改商品数据数据的id
      goodsEditId: ""
    };
  },
  // 生命周期
  created() {
    // // 取页码数据  和  每页的数据条数
    this.getGoodsListByPage();
  },
  methods: {
    // 表单查询
    search() {
      // // 点击查询的时候    收集数据
      // let params = {
      //   category: this.searchForm.goodsGroup,
      //   keyWord: this.searchForm.keyWord
      // };
      // // 发送请求给后端
      // this.axios
      //   .get("/goods/searchGoods", params)
      //   .then(response => {
      //     console.log(response);
      //     this.goodsTableData = response;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      //注意：如果想让分页的数据和查询紧密相联系的话，查询的函数里面就要调用分页函数，这样数据总条数，每页数据数，页码改变时才会同步进行！！
      // 如果这里面不调用分页函数的话，点击’查询‘的时候，页面数据（数据特定类目总条数）并不会发生改变，只有点击页码才会触发函数！！！
      this.getGoodsListByPage()          
    },
    // 当选择状态改变 触发这个函数
    handleSelectionChange(val) {
      // 把选中的数据 保存到一个变量里面
      this.multipleSelection = val;
    },
    // // 商品编辑==发送请求，跳转页面，并且进行数据回填
    goodsEdit(id) {
      // 保存id
      this.goodsEditId = id;
      // 保存id 到浏览器的本地存储中
      window.localStorage.setItem("goodsEditId", this.goodsEditId);
      // 跳转
      this.$router.push("/goodsedit");
    },
    // 商品删除功能函数
    goodsDelete(id) {
      //   发送ajax  把传入的id 发送给后端
      this.axios
        .get(`/goods/goodsDelete`, { id })
        .then(response => {
          // console.log(response.data)   //得到的是后端  send  过来的数据

          // 把后端传过来的数据  放入变量中保存
          let { error_code, message } = response;
          //   根据状态码的值  对是否删除成功进行判断，从而在前端页面中给予提示信息
          if (error_code === 0) {
            //0   成功
            this.$message({
              message,
              type: "success"
            });
            // 每次点一次删除，纪要重新再后台的数据库中重新查找数据，并进行显示
            // this.getAccountList();
            this.getGoodsListByPage();
          } else {
            //否则就插入失败
            this.$message.error(message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 批量删除功能
    batchDelete() {
      // alert("123");
      // 遍历被选中的所有数据数组，从而获取其中的id
      let batchDeleteId = this.multipleSelection.map(items => {
        return items.id;
      });
      // console.log(batchDeleteId)
      // 发送axios请求给后端(这里要用到get的另外一种传多个相同参数不同值的方法)
      this.axios
        .get("/goods/batchDelete", { batchDeleteId })
        .then(response => {
          // console.log(response.data);
          // 获取数据对象
          let { error_code, message } = response;
          // 判断
          if (error_code === 0) {
            //删除成功
            this.$message({
              type: "success",
              message
            });
            // this.getAccountList();
            this.getGoodsListByPage();
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消选择
    // 取消选择的函数
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 保存每页条数到变量中
      this.pageSize = val;
      // console.log(`每页 ${this.pageSize} 条`);
      // 调用分页函数
      this.getGoodsListByPage();
    },
    // 当前页码
    handleCurrentChange(val) {
      // 保存当前页面到变量中
      this.currentPage = val;
      // console.log(`当前页: ${this.currentPage}`);
      // 调用分页函数
      this.getGoodsListByPage();
    },
    // 分页   函数
    getGoodsListByPage() {
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      
      let params = {
        pageSize,
        currentPage,
        category: this.searchForm.goodsGroup,
        keyWord: this.searchForm.keyWord
      };
      // 把页码数据存入浏览器的本地存储中
      window.localStorage.setItem("pageSize", pageSize);
      window.localStorage.setItem("currentPage", currentPage);

      // let pageSize = window.localStorage.getItem("pageSize");
      // let currentPage = window.localStorage.getItem("currentPage");
      // this.pageSize = Number(pageSize);
      // this.currentPage = Number(currentPage);
      // 发送axios（ajax）请求给后台，并发送参数
      this.axios
        .get("/goods/getGoodsListByPage", params)
        .then(response => {
          let { total, data } = response;
          console.log(`数据总条数为：${total},当前页的数据为：${data}`);

          this.goodsTableData = data;
          this.total = total;
          // 删除完每页最后一个数据（当前页没有数据的时候），currentPage不会自动刷新，所有要进行数据的判断
          if (!data.length && this.currentPage !== 1) {
            //没有数据    注意：当第一页没有数据的时候，自己调用自己，后台服务器会崩溃
            // 页码自减1
            this.currentPage -= 1; //这个条件是递归出口。没有这个的话，会一直调用自己
            this.getGoodsListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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