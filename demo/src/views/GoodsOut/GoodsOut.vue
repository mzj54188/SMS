<template>
  <div class="goodsout">
    <!-- 顶部 -->
    <div class="goodsoutTop">
      商品销售。带
      <span class="red">*</span>为必填项目。先把商品加入订单。所有商品都加入订单后点
      <span class="red">确认提交</span>完成
    </div>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片标题 -->
      <div slot="header" class="clearfix">
        <span>商品销售</span>
      </div>
      <!-- 卡片内容部分(身体) -->
      <div>
        <!-- 第一部分内容 -->
        <el-form
          :rules="rules"
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="商品条形码" prop="goodsBarCode">
            <el-input
              type="goodsBarCode"
              v-model.number="numberValidateForm.goodsBarCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 商品数量 -->
          <el-form-item label="数量" prop="goodsNumber">
            <el-input
              
              v-model.number="numberValidateForm.goodsNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="joinOrder">加入订单</el-button>
            <el-button @click="outStockAgain">重新出库</el-button>
          </el-form-item>
        </el-form>
        <!-- 商品列表部分=====第二部分内容 -->
        <div class="goodsList">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="goodsName" label="名称"></el-table-column>
            <el-table-column prop="goodsNumber" label="数量"></el-table-column>
            <el-table-column prop="goodsUnitPrice" label="单价（元）"></el-table-column>
            <el-table-column prop="goodsTotalPrice" label="总价（元）"></el-table-column>
            <el-table-column prop="goodsOfferPrice" label="优惠总价（元）"></el-table-column>
          </el-table>
          <div class="goodsDes">
            <span>
              总价：0元，优惠：0元。
              <span class="red">小计：0元</span>
            </span>
          </div>
        </div>
        <!--会员卡号===========第三部分内容 -->
        <el-form
          :rules="rules"
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item class="vipNumber" label="会员卡号" prop="vipNumber">
            <el-input
              type="goodsBarCode"
              v-model.number="numberValidateForm.vipNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="vipDes">填写会员卡卡号</el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单验证
      rules: {
        // 商品条形码
        goodsBarCode: [
          { required: true, message: "商品条形码不能为空" },
          { type: "number", message: "商品条形码必须为数字值" }
        ],
        // 商品数量
        goodsNumber: [
          { required: true, message: "数量不能为空" },
          { type: "number", message: "数量必须为数字值" }
        ],
        // 会员卡号
        vipNumber: [
          { required: true, message: "会员卡号不能为空" },
          { type: "number", message: "会员卡号必须为数字值" }
        ]
      },
      // 商品条形码和数量数据
      numberValidateForm: {
        goodsBarCode: "",
        goodsNumber: "",
        vipNumber: ""
      },
      //  商品表格数据
      tableData: [
        {
          goodsName: "暂无商品",
          goodsNumber: "",
          goodsUnitPrice: "",
          goodsTotalPrice: "",
          goodsOfferPrice: ""
        }
      ]
    };
  },
  methods: {
    joinOrder() {
      alert("加入订单");
    },
    outStockAgain() {
      alert("重新出库");
    },
    confirmSubmit() {
      alert("会员卡号");
    }
  }
};
</script>
<style lang="less">
.goodsout {
  // 卡片
  .el-card {
    //   卡片身体
    .el-card__body {
      // 商品列表（第二部分内容）
      .goodsList {
        border-bottom: 1px solid #ccc;
        padding-bottom: 6px;
        // 总价一行
        .goodsDes {
          .red {
            color: red;
          }
          text-align: left;
          line-height: 40px;
        }
      }
      // 第一、三部分内容
      .el-form {
        border-bottom: 1px solid #ccc;
        .vipDes {
          text-align: left;
          margin: 0px;
          padding-top: 10px;
        }
        // 会员卡号
        .vipNumber {
          padding-top: 16px;
          margin-bottom: 0px;
        }
        .el-form-item {
          .el-form-item__content {
            text-align: left;
            // 商品条形码的输入框
            .el-input {
              width: 260px;
            }
          }
        }
      }
    }
    // 卡片标题======商品销售
    .el-card__header {
      text-align: left;
      background: #ccc;
    }
    margin-top: 40px;
  }
  // 顶部
  .goodsoutTop {
    text-align: left;
    .red {
      color: red;
    }
  }
}
</style>