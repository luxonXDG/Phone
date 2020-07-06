import React from 'react';  //导入react
import {Switch, Route} from 'react-router-dom'
// import {inject,observer} from "mobx-react";
import loadable from '@loadable/component'

//xxx 组件名
class ContentRouter extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {
          data : [
            {
              menuId:1,menuName:"首页",menuUrl:"/index/HomePage",menupath:"HomePage",componentPath:"HomePage/HomePage",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
            },
            {
              menuId:2,menuName:"商品管理",menuUrl:"/index/Product",menupath:"Product",componentPath:"Product/Product",menuIcon:"ShoppingOutlined",menuState: 0,menuChilds:[
                {
                  menuId:3,menuName:"商品列表",menuUrl:"/index/Product/ProductList",menupath:"ProductList",componentPath:"Product/ProductList",menuIcon:"ShoppingOutlined",menuState: 0,menuChilds:[]
                },
                {
                  menuId:4,menuName:"添加商品",menuUrl:"/index/Product/AddProduct",menupath:"AddProduct",componentPath:"Product/AddProduct",menuIcon:"ShoppingOutlined",menuState: 0,menuChilds:[]
                }
              ]
            },
            {
              menuId:5,menuName:"优惠券管理",menuUrl:"/index/Discount",menupath:"Discount",componentPath:"Discount/Discount",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
            },
            {
              menuId:6,menuName:"品牌管理",menuUrl:"/index/Brand",menupath:"Brand",componentPath:"Brand/Brand",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
            },
            {
              menuId:7,menuName:"类型管理",menuUrl:"/index/Typeproduct",menupath:"Typeproduct",componentPath:"Typeproduct/Typeproduct",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
            },
            {
              menuId:8,menuName:"订单管理",menuUrl:"/index/Orderproduct",menupath:"Orderproduct",componentPath:"Orderproduct/Orderproduct",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[
                {
                  menuId:9,menuName:"订单列表",menuUrl:"/index/Orderproduct/Orderproductlist",menupath:"Orderproductlist",componentPath:"Orderproduct/Orderproductlist",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
                },
                {
                  menuId:10,menuName:"发货管理",menuUrl:"/index/Orderproduct/Orderdeliver",menupath:"Orderdeliver",componentPath:"Orderproduct/Orderdeliver",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
                },
                {
                  menuId:11,menuName:"未处理异常订单",menuUrl:"/index/Orderproduct/Abnormalorder",menupath:"Abnormalorder",componentPath:"Orderproduct/Abnormalorder",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
                }
              ]
            },
            {
              menuId:12,menuName:"销售管理",menuUrl:"/index/Salesproduct",menupath:"Salesproduct",componentPath:"Salesproduct/Salesproduct",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[
                {
                  menuId:13,menuName:"销售统计表",menuUrl:"/index/Salesproduct/Salesproductlist",menupath:"Salesproductlist",componentPath:"Salesproduct/Salesproductlist",menuIcon:"AreaChartOutlined",menuState: 0,menuChilds:[]
                }
              ]
            },
            {
              menuId:14,menuName:"用户管理",menuUrl:"/index/UserControl",menupath:"UserControl",componentPath:"UserControl/UserControl",menuIcon:"UserOutlined",menuState: 0,menuChilds:[
                {
                  menuId:15,menuName:"用户列表",menuUrl:"/index/UserControl/UserList",menupath:"UserList",componentPath:"UserControl/UserList",menuIcon:"UserOutlined",menuState: 0,menuChilds:[]
                }
              ]
            },
            {
              menuId:16,menuName:"权限管理",menuUrl:"/index/Authority",menupath:"Authority",componentPath:"Authority/Authority",menuIcon:"IdcardOutlined",menuState: 0,menuChilds:[
                {
                  menuId:17,menuName:"角色管理",menuUrl:"/index/Authority/AuthorityRole",menupath:"AuthorityRole",componentPath:"Authority/AuthorityRole",menuIcon:"IdcardOutlined",menuState: 0,menuChilds:[]
                },
                {
                  menuId:18,menuName:"运营人员管理",menuUrl:"/index/Authority/Operational",menupath:"Operational",componentPath:"Authority/Operational",menuIcon:"IdcardOutlined",menuState: 0,menuChilds:[]
                }
              ]
            }
          ],
          RouterList:[]
        }
    }
    bindRouter(routerList){
      let RouterList = routerList.map((item)=>{
        if (item.menuChilds.length === 0){
          return <Route key={item.menuId} path={item.menuUrl} component={ loadable( () => import(`./${item.componentPath}`))}/>
        }else {
          return <Route key={item.menuId} path={item.menuUrl}  render={()=>
            <item.menupath>
           {this.bindRouter(item.menuChilds)}
            </item.menupath>
          }>
          </Route>
        }
      });
      return RouterList
    }
    componentWillMount() {
      console.log(this.state.data)
      let list =  this.bindRouter(this.state.data)
      this.setState({
        RouterList : list
      })
    }

//渲染
    render() {
        return (
            <div>
              <Switch>
                {this.state.RouterList}
              </Switch>
            </div>
        )
    }
}

export {ContentRouter as default}
