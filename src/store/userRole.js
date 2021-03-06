import {observable,action} from "mobx";
import Roleapi from '../api/index';
import axios from '../utils/axios';


class userRole {
  @observable data = [
    {
      menuId: 1,
      menuName: "首页",
      menuUrl: "/index/HomePage",
      menupath: "HomePage",
      componentPath: "HomePage/HomePage",
      menuIcon: "AreaChartOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 2,
      menuName: "商品管理",
      menuUrl: "/index/Product",
      menupath: "Product",
      componentPath: "Product/Product",
      menuIcon: "ShoppingOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 3,
          menuName: "商品列表",
          menuUrl: "/index/Product/ProductList",
          menupath: "ProductList",
          componentPath: "Product/ProductList",
          menuIcon: "ShoppingOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 4,
          menuName: "添加商品",
          menuUrl: "/index/Product/AddProduct",
          menupath: "AddProduct",
          componentPath: "Product/AddProduct",
          menuIcon: "ShoppingOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 5,
      menuName: "优惠券管理",
      menuUrl: "/index/Discount",
      menupath: "Discount",
      componentPath: "Discount/Discount",
      menuIcon: "BookOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 6,
      menuName: "品牌管理",
      menuUrl: "/index/Brand",
      menupath: "Brand",
      componentPath: "Brand/Brand",
      menuIcon: "SlackOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 7,
      menuName: "类型管理",
      menuUrl: "/index/Typeproduct",
      menupath: "Typeproduct",
      componentPath: "Typeproduct/Typeproduct",
      menuIcon: "AppstoreOutlined",
      menuState: 0,
      menuChilds: []
    },
    {
      menuId: 8,
      menuName: "订单管理",
      menuUrl: "/index/Orderproduct",
      menupath: "Orderproduct",
      componentPath: "Orderproduct/Orderproduct",
      menuIcon: "CopyOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 9,
          menuName: "订单列表",
          menuUrl: "/index/Orderproduct/Orderproductlist",
          menupath: "Orderproductlist",
          componentPath: "Orderproduct/Orderproductlist",
          menuIcon: "CopyOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 10,
          menuName: "发货管理",
          menuUrl: "/index/Orderproduct/Orderdeliver",
          menupath: "Orderdeliver",
          componentPath: "Orderproduct/Orderdeliver",
          menuIcon: "CopyOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 11,
          menuName: "未处理异常订单",
          menuUrl: "/index/Orderproduct/Abnormalorder",
          menupath: "Abnormalorder",
          componentPath: "Orderproduct/Abnormalorder",
          menuIcon: "CopyOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 12,
      menuName: "销售管理",
      menuUrl: "/index/Salesproduct",
      menupath: "Salesproduct",
      componentPath: "Salesproduct/Salesproduct",
      menuIcon: "PayCircleOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 13,
          menuName: "销售统计表",
          menuUrl: "/index/Salesproduct/Salesproductlist",
          menupath: "Salesproductlist",
          componentPath: "Salesproduct/Salesproductlist",
          menuIcon: "PayCircleOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 14,
      menuName: "用户管理",
      menuUrl: "/index/UserControl",
      menupath: "UserControl",
      componentPath: "UserControl/UserControl",
      menuIcon: "UserOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 15,
          menuName: "用户列表",
          menuUrl: "/index/UserControl/UserList",
          menupath: "UserList",
          componentPath: "UserControl/UserList",
          menuIcon: "UserOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 16,
      menuName: "库存管理",
      menuUrl: "/index/Stock",
      menupath: "Stock",
      componentPath: "Stock/Stock",
      menuIcon: "ControlOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 17,
          menuName: "库存列表",
          menuUrl: "/index/Stock/StockList",
          menupath: "StockList",
          componentPath: "Stock/StockList",
          menuIcon: "ControlOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    },
    {
      menuId: 18,
      menuName: "权限管理",
      menuUrl: "/index/Authority",
      menupath: "Authority",
      componentPath: "Authority/Authority",
      menuIcon: "SlidersOutlined",
      menuState: 0,
      menuChilds: [
        {
          menuId: 19,
          menuName: "角色管理",
          menuUrl: "/index/Authority/AuthorityRole",
          menupath: "AuthorityRole",
          componentPath: "Authority/AuthorityRole",
          menuIcon: "SlidersOutlined",
          menuState: 0,
          menuChilds: []
        },
        {
          menuId: 20,
          menuName: "运营人员管理",
          menuUrl: "/index/Authority/Operational",
          menupath: "Operational",
          componentPath: "Authority/Operational",
          menuIcon: "SlidersOutlined",
          menuState: 0,
          menuChilds: []
        }
      ]
    }
  ];    //菜单
  @observable menulist = [];   //存放菜单数组
  @observable access_token = ''; //token
  @observable token_type='';
  @observable refresh_token ='';
  @observable isLogin = false;  //是否登录
  @observable datalist = [];    //存放角色数组
  @observable userRolelist = [];   //存放用户数组
  @observable menu = [];   //存放用户数组

  @observable roleID = 0;   //角色ID
  @observable userID = 0;   //角色ID


  @observable selectvalue = ''; //下拉值
  @observable ids = 0 ;    //用户id

  @observable isaddid = 0;  //添加用户id
  @observable isaddusername = '';  //添加用户姓名
  @observable isadduserpwd = '';  //添加用户密码
  @observable cundangqianID = 0;    //存放当前登录用户id\
  @observable roleName = 0;   //存当前管理员信息
  @observable username = '';    //存放账号名字
  @observable RoleStatus = 0;   //角色状态

  @observable role_nameZh = [];   //存取获取的id
    @observable roleid = 0;
  @observable value = '';   //运营人员下拉值
    @observable rolelist = [];

  //获取角色数据
  @action getRole(list) {
    this.datalist = list;
    console.log(JSON.parse(JSON.stringify(this.datalist)));
  };
    // @action getRolebinduser(list) {
    //     console.log(list);
    //     this.rolelist = list;
    //     console.log(JSON.parse(JSON.stringify(this.rolelist)));
    // };
  //登录
  @action login = (obj) => {
    return new Promise((resolve, reject) => {
      axios.post(Roleapi.userRole.adminlogin,
        {password: obj.password, username: obj.username},
        {
          transformRequest: [
            function (data) {
              let params = "";
              var arr = [];
              for (var key in data) {
                arr.push(key + "=" + data[key]);
              }
              params = arr.join("&");
              return params;
            }
          ]
        },
        axios.get(Roleapi.userRole.getMenuList).then((res)=>{
          console.log(res);
          if(res.data.code == 200){
            localStorage.setItem('menu',JSON.stringify(res.data.data))
          }
        })

      ).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.access_token = res.data.data.access_token;
          this.token_type = res.data.data.token_type;
          this.refresh_token = res.data.data.refresh_token
          localStorage.setItem('access_token', res.data.data.access_token);   //
          localStorage.setItem('refresh_token',  this.refresh_token);   //
          resolve('登录成功')
        } else{
          reject('登录失败')
        }
      }).catch((err) => {
        // console.log('错误');
        console.log(err);
      })
    })
  };
  //  获取用户
  @action getuserRole(userRolelist){
    this.userRolelist = userRolelist
    // console.log(JSON.parse(JSON.stringify(this.userRolelist)));
  };
  // @action getmenulistByrole(num){
  //   console.log('num',num);
  //  this.menuIds=num
  // }
}
export default userRole
