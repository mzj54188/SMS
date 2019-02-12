<template>
  <div class="goodsadd">
    <div class="goodstop">
      1.你可以在这里添加新的商品或者编辑已有的商品。2.新添加的商品的时候可以同时进行入库（入库必须有数量和进价）！3.带
      <span class="star">*</span>&nbsp;的项目必填
    </div>
    <!-- 添加商品   外层盒子 -->
    <div class="goodsaddWrapper">
      <el-card class="box-card">
        <!-- 添加商品    标题部分 -->
        <div slot="header" class="title">
          <span class="a">添加商品</span>
        </div>
        <!-- 添加商品表单====外层盒子 -->
        <el-form
          :model="goods"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 1：下拉框==========所属分类 -->
          <el-form-item label="所属分类：" prop="category">
            <el-select v-model="goods.category" placeholder="======选择分类======">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
                <el-input v-model="goods.purchasePrice"></el-input>
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
            <el-row>
              <el-col :span="12">
                <el-input v-model="goods.unit"></el-input>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>

          <!-- 10：会员优惠 -->
          <el-form-item label="会员优惠：" prop="radio1">
            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-radio v-model="goods.radio1" label="1">享受</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio v-model="goods.radio1" label="2">不享受</el-radio>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 11：是否促销 -->
          <el-form-item label="是否促销：" prop="radio2">
            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-radio v-model="goods.radio2" label="1">启用</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio v-model="goods.radio2" label="2">禁用</el-radio>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 12：商品简介 -->
          <el-form-item label="商品简介" prop="desc">
            <el-input type="textarea" v-model="goods.desc"></el-input>
          </el-form-item>

          <!-- 13：添加按钮 -->
          <el-form-item >
            <el-button type="success" class="success" @click="goodsAdd">添加</el-button>
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
        //   ===========单选框===========
        radio1: "",
        radio2: "",
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 生成条形码按钮
    generateBarCode(){
      alert('生成条形码')
    },
    // 商品添加按钮
    goodsAdd(){
      alert('商品添加成功')
    },
  }
};
</script>
<style lang="less">
.goodsadd {
  .goodstop {
    text-align: left;
    .star {
      color: #ff6700;
    }
  }
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
            .success{
                margin-left: -80px;
            }
          }
        }
        // 生成条形码
        .barcode{

            .el-form-item__content{
                width: 400px;
                .el-row{
                    .btn{
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