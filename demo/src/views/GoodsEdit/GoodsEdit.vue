<template>
  <!-- 编辑商品页面 -->
  <div class="goods-edit">
    <!-- 添加商品   外层盒子 -->
    <div class="goodsaddWrapper">
      <el-card class="box-card">
        <!-- 添加商品    标题部分 -->
        <div slot="header" class="title">
          <span class="a">编辑商品</span>
        </div>
        <!-- 添加商品表单====外层盒子 
        细节注意：在使用resetFields 或者validata 的时候，最外面的表单的ref要接收数据，必须和data中的数据表单名一致，不然是未定义的错误
        -->
        <el-form
          :model="goods"
          :rules="rules"
          ref="goods"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 1：下拉框==========所属分类 -->
          <el-form-item label="所属分类：" prop="category">
            <el-select v-model="goods.category" placeholder="======选择分类======">
              <el-option label="酒水类" value="酒水"></el-option>
              <el-option label="水果类" value="水果"></el-option>
              <el-option label="电子产品" value="电子产品"></el-option>
              <el-option label="母婴产品" value="母婴产品"></el-option>
              <el-option label="休闲零食" value="休闲零食"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
            </el-select>
          </el-form-item>

          <!-- 2：商品条形码  productBarcode-->
          <el-form-item label="商品条形码" prop="barcode" class="barcode">
            <el-row>
              <el-col :span="18">
                <el-input v-model="goods.barcode"></el-input>
              </el-col>
              <el-col :span="6" class="btn">
                <el-button type="success" round @click="generateBarCode">生成条形码</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 3：商品名称 -->
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goods.name"></el-input>
          </el-form-item>

          <!-- 4：商品售价 -->
          <el-form-item label="商品售价" prop="price">
            <el-row>
              <el-col :span="12">
                <el-input v-model="goods.price"></el-input>
              </el-col>
              <el-col :span="12">元</el-col>
            </el-row>
          </el-form-item>

          <!-- 5：市场价 -->
          <el-form-item label="市场价" prop="marketPrice">
            <el-row>
              <el-col :span="12">
                <el-input v-model="goods.marketPrice"></el-input>
              </el-col>
              <el-col :span="12">元</el-col>
            </el-row>
          </el-form-item>

          <!-- 6：商品进价 -->
          <el-form-item label="商品进价" prop="purchasePrice">
            <el-row>
              <el-col :span="12">
                <el-input v-model="goods.purchasePrice" @blur="autoPrice"></el-input>
              </el-col>
              <el-col :span="12">元</el-col>
            </el-row>
          </el-form-item>

          <!-- 7：入库数量 -->
          <el-form-item label="入库数量" prop="storageNumber">
            <el-row>
              <el-col :span="12">
                <el-input v-model="goods.storageNumber"></el-input>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>

          <!-- 8：商品重量 -->
          <el-form-item label="商品重量" prop="weight">
            <el-row>
              <el-col :span="12">
                <el-input v-model="goods.weight"></el-input>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>

          <!-- 9：商品单位 -->
          <el-form-item label="商品单位" prop="unit">
            <el-select v-model="goods.unit" placeholder="选择单位">
              <el-option label="个" value="个"></el-option>
              <el-option label="件" value="件"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="斤" value="斤"></el-option>
              <el-option label="袋" value="袋"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="箱" value="箱"></el-option>
            </el-select>
          </el-form-item>

          <!-- 10：会员优惠 -->
          <el-form-item label="会员优惠：">
            <el-radio-group v-model="goods.discount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 11：是否促销 -->
          <el-form-item label="是否促销：">
            <el-radio-group v-model="goods.promotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 12：商品简介 -->
          <el-form-item label="商品简介" prop="desc">
            <el-input type="textarea" v-model="goods.desc"></el-input>
          </el-form-item>

          <!-- 13：添加按钮 -->
          <el-form-item>
            <el-button type="primary" class="success" @click="saveEdit('goods')">确定</el-button>
            <el-button @click="goodsReset('goods')">重置</el-button>
            <el-button @click="comeback">返回 商品管理</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: {
        //   1：所属分类
        category: "",
        //   2：商品条形码
        barcode: "",
        //   3：商品名称
        name: "",
        //   4：商品售价
        price: "",
        //   5：市场价
        marketPrice: "",
        //   6：商品进价
        purchasePrice: "",
        //   7：入库数量
        storageNumber: "",
        //   8：商品重量
        weight: "",
        //   9：商品单位
        unit: "",
        discount: "",
        promotion: "",
        // =========商品简介-=========
        desc: ""
      },
      //   验证规则
      rules: {
        //  1:所属分类
        category: [
          { required: true, message: "请选择所属分类", trigger: "change" }
        ],
        // 2:商品条形码
        barcode: [
          { required: true, message: "还未生成条形码", trigger: "blur" }
        ],
        // 3：商品名称
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        // 4：商品售价
        price: [{ required: true, message: "请输入商品售价", trigger: "blur" }],
        // 5：市场价
        marketPrice: [
          { required: true, message: "请输入市场价", trigger: "blur" }
        ],
        // 6：商品进价
        purchasePrice: [
          { required: true, message: "请输入商品进价", trigger: "blur" }
        ],
        // 7：入库数量
        storageNumber: [
          { required: true, message: "请输入入库数量", trigger: "blur" }
        ],
        // 8：商品重量
        weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        // 9：商品单位
        unit: [{ required: true, message: "请输入商品单位", trigger: "blur" }],

        // 商品描述
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      goodsEditId: 0
    };
  },
  methods: {
    comeback() {
      this.$router.push("/goodsmanage");
    },
    // 自动生成价格的函数
    autoPrice() {
      this.goods.marketPrice = this.goods.purchasePrice * 3; //市场价
      this.goods.price = this.goods.purchasePrice * 2; //商品售价
    },
    // 数据回填的函数
    // 商品编辑==发送请求，跳转页面，并且进行数据回填
    goodsEdit(id) {
      // 保存id
      this.goodsEditId = Number(window.localStorage.getItem("goodsEditId"));
      id = this.goodsEditId; //这里要注意赋值给形参id！！！！
      // alert(this.accountEditId);
      // console.log(this.goodsEditId);
      // 当点击  ‘编辑’ 按钮的时候， 前端发送请求
      this.axios
        .get(`/goods/goodsEdit`, { id })
        .then(response => {
          // 把后台从数据库中查找到的数据进行保存
          // 要注意的是：从后台拿过来的数据是一个数组！！！而不是一个对象
          let result = response[0];
          console.log(response);
          // 把后端响应回来的数据进行赋值到模态框
          this.goods.category = result.goodsGroup;
          this.goods.barcode = result.goodsBarCode;
          this.goods.name = result.goodsName;
          this.goods.price = result.goodsPrice;
          this.goods.marketPrice = result.goodsMarketPrice;
          this.goods.purchasePrice = result.goodsPurchasePrice;
          this.goods.storageNumber = result.storageNumber;
          this.goods.weight = result.goodsWeight;
          this.goods.unit = result.goodsUnit;
          this.goods.discount = result.vipOffer;
          this.goods.promotion = result.ifPromote;
          this.goods.desc = result.goodsDesc;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确定添加添加商品函数
    saveEdit() {
      // 获取表单中的所有数据
      let params = {
        category: this.goods.category,
        barcode: this.goods.barcode, //   2：商品条形码
        name: this.goods.name, //   3：商品名称
        price: this.goods.price, //   4：商品售价
        marketPrice: this.goods.marketPrice, //   5：市场价
        purchasePrice: this.goods.purchasePrice, //   6：商品进价
        storageNumber: this.goods.storageNumber, //   7：入库数量
        weight: this.goods.weight, //   8：商品重量
        unit: this.goods.unit, //   9：商品单位
        discount: this.goods.discount, //是否优惠
        promotion: this.goods.promotion, //是否促销
        desc: this.goods.desc ,// =========商品简介
        goodsEditId:this.goodsEditId
      };
      //发送请求给后台(表单提交用post)
      this.axios
        .post(`/goods/saveEdit`, params)
        .then(response => {
          console.log(response)
          // 接收后端响应的数据对象
          let { error_code, message } = response;
          if (error_code === 0) {
            this.$message({
              message,
              type: "success"
            });
            // this.getAccountList();
            // this.getAccountListByPage();
            this.$router.push('/goodsmanage')
          } else {
            this.$message({
              message,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置商品表单函数
    goodsReset(formName) {
      this.$refs.goods.resetFields();
      // this.$refs[formName].resetFields();
    },
    // 生成条形码按钮
    generateBarCode() {
      alert("生成条形码");
    }
  },
  created() {
    // 调用回填函数
    this.goodsEdit();
  }
};
</script>
<style lang="less">
.goods-edit {
  .goodsaddWrapper {
    margin-top: 20px;
    .box-card {
      // 表单
      .el-form {
        .el-form-item {
          // 下拉框的位置
          .el-form-item__content {
            text-align: left;
            width: 300px;
            .success {
              margin-left: -80px;
            }
          }
        }
        // 生成条形码
        .barcode {
          .el-form-item__content {
            width: 400px;
            .el-row {
              .btn {
                width: 100px;
              }
            }
          }
        }
      }
      // 标题
      .title {
        text-align: left;
      }
    }
  }
}
</style>