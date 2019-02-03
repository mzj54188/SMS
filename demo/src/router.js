import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')//登录
    },
    {
      path: '/',
      name: 'Index',
      component: () => import('./views/Index/Index.vue'),  //首页
      children:[
        {
          path: '',
          component: () => import('./views/Home/Home.vue')
        },
        {
          path:'/goodsmanage',
          name:'goodsmanage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue') //商品管理
        },
        {
          path:'/goodsadd',
          name:'goodsadd',
          component:()=>import('./views/GoodsAdd/GoodsAdd.vue')  //添加商品
        },
        {
          path:'/inventorymanage',
          name:'inventorymanage',
          component:()=>import('./views/InventoryManage/InventoryManage.vue')  //库存管理
        },
        {
          path:'/inventoryadd',
          name:'inventoryadd',
          component:()=>import('./views/InventoryAdd/InventoryAdd.vue')  //添加库存
        },
        {
          path:'/saleslist',
          name:'saleslist',
          component:()=>import('./views/SalesList/SalesList.vue')  //销售列表
        },
        {
          path:'/goodsout',
          name:'goodsout',
          component:()=>import('./views/GoodsOut/GoodsOut.vue')  //商品出库
        },
        {
          path:'/goodsreturn',
          name:'goodsreturn',
          component:()=>import('./views/GoodsReturn/GoodsReturn.vue')  //商品退货
        },
        {
          path:'/salestatistics',
          name:'salestatistics',
          component:()=>import('./views/SaleStatistics/SaleStatistics.vue')  //销售统计
        },
        {
          path:'/incomstatistics',
          name:'incomstatistics',
          component:()=>import('./views/IncomStatistics/IncomStatistics.vue')  //进货统计
        },
        {
          path:'/accountmanage',
          name:'accountmanage',
          component:()=>import('./views/AccountManage/AccountManage.vue')  //账号管理
        },
        {
          path:'/accountadd',
          name:'accountadd',
          component:()=>import('./views/AccountAdd/AccountAdd.vue')  //添加账号
        },
        {
          path:'/passwordmodifi',
          name:'passwordmodifi',
          component:()=>import('./views/PasswordModifi/PasswordModifi.vue')  //密码修改
        },
        {
          path:'/vipmanage',
          name:'vipmanage',
          component:()=>import('./views/VipManage/VipManage.vue')  //会员管理=> 账号管理
        },
        {
          path:'/vipadd',
          name:'vipadd',
          component:()=>import('./views/VipAdd/VipAdd.vue')  //会员管理=>  添加账号
        },
        {
          path:'/systeminformation',
          name:'systeminformation',
          component:()=>import('./views/SystemInFormation/SystemInFormation.vue')  //系统信息
        }
      ]
    }
  ]
})
