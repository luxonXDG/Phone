import React from 'react';  //导入react
import { Row, Col } from 'antd';
import { Input,Select,Button,Switch,Space,Table,Tooltip,Modal,Popconfirm,message} from 'antd';
import { DatePicker } from 'antd';
import axios from 'axios'
import ioApi from '../../api/index'
import locale from 'antd/lib/date-picker/locale/zh_CN'
const { RangePicker } = DatePicker;

//xxx 组件名
class ProductDetails extends React.Component {
//渲染
    state = { visible: false };
    showModal = (data) => {
        this.setState({
            visible: true,
            nowGuiGeId:data.specificationsId
        });
    };
    handleOk = e => {
        console.log(e);
        axios.post(ioApi.product.openTeJia,{
            SpecificationsId:this.state.nowGuiGeId,
            endtime:this.state.teTime,
            isCoupon:this.state.youHui,
            isPrice:1,
            price:this.state.teJiaJinEr
        }, {
            transformRequest:[
                function(data){
                    let params = "";
                    var arr = [];
                    for(var key in data){
                        arr.push(key+"="+data[key]);
                    }
                    params = arr.join("&");
                    return params;
                }
            ]
        }).then((res)=>{
            console.log(res);
            this.initDate(this.state.id)
        })
        this.setState({
            visible: false,
            teTime:"",
            teJiaJinEr:"",
            youHui:0,
            nowGuiGeId:""
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    teJiaXuanRan(data) {
        if(data.isprice){
            return <Popconfirm
                title="你确定关闭特价吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={()=>this.closeTeJia(data)}
            >
            <Button danger>关闭特价</Button>
            </Popconfirm>
        }
        else {
            return <Button type="primary" onClick={()=>this.showModal(data)}>开启特价</Button>
        }
    };
    back(){
        this.props.history.go(-1)
    }
    closeTeJia(data){
        axios.post(ioApi.product.closeTeJia,{
            SpecificationsId:data.specificationsId
        }, {
            transformRequest:[
                function(data){
                    let params = "";
                    var arr = [];
                    for(var key in data){
                        arr.push(key+"="+data[key]);
                    }
                    params = arr.join("&");
                    return params;
                }
            ]
        }).then((res)=>{
            console.log(res);
            this.initDate(this.state.id)
        })
    }
    constructor(props){
        super(props)
        this.state={
            id:"",
            productMsg:"",
            FengMianImg:[],
            XiangQing:[],
            kuChunMsg:"",
            zhuangTai:"",
            reXiao:"",
            qiangGou:"",
            youHuiQuan:"",
            guanJianZi:'',
            GuiGeList:"",
            teTime:"",
            teJiaJinEr:"",
            youHui:0,
            nowGuiGeId:""
        }
    }
    componentWillMount(){
        if(this.props.location.query !== undefined){
            console.log(this.props.location.query.id);
            this.setState({
                id:this.props.location.query.id
            })
            let thisId = this.props.location.query.id
            this.initDate(thisId)
        }
        else {
            this.props.history.push("/index/Product/ProductList")
        }

    }
    initDate(thisId){
        let key = "upload"
        message.loading({content:"加载中",key})
        axios.post(ioApi.product.ProductById,{
            GoodsId:thisId
        }, {
            transformRequest:[
                function(data){
                    let params = "";
                    var arr = [];
                    for(var key in data){
                        arr.push(key+"="+data[key]);
                    }
                    params = arr.join("&");
                    return params;
                }
            ]
        }).then((res)=>{
            if(res.data.code === 500){
                message.error({content:"加载失败：这波还是后台的锅",key,duration:2})
            }
            if(res.data.data.goodsFlag.length>0&&res.data.data.goodsFlag!==undefined){
                this.getGuanJianZi(res.data.data.goodsFlag)
            }
            if(res.data.data.specifications !== undefined){
                this.guiGeGuoLi(res.data.data.specifications)
            }

            this.setState({
                GuiGeList:res.data.data.specifications,
                productMsg:res.data.data,
                FengMianImg:res.data.data.goodsCoverImg.map(function (itme) {
                    return <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src={itme.img} width={240}/>
                        </div>
                    </Col>
                }),
                XiangQing:res.data.data.goodsDetailimg.map(function (itme) {
                    return <Col span={5}>
                        <div style={{width:240,height:240,overflow:"hidden"}}>
                            <img src={itme.img} width={240}/>
                        </div>
                    </Col>
                }),
            },function () {
                if(res.data.data.goodsStatue === 1){
                    this.setState({
                        zhuangTai:"上架中"
                    })
                }
                else{
                    this.setState({
                        zhuangTai:"已下架"
                    })
                }
                if(res.data.data.goodsIsHot === 1){
                    this.setState({
                        reXiao:"是"
                    })
                }
                else{
                    this.setState({
                        reXiao:"否"
                    })
                }
                if(res.data.data.goodsIsRush === 1){
                    this.setState({
                        qiangGou:"是"
                    })
                }
                else{
                    this.setState({
                        qiangGou:"否"
                    })
                }
                if(res.data.data.goodsIscoupon === 1){
                    this.setState({
                        youHuiQuan:"是"
                    })
                }
                else{
                    this.setState({
                        youHuiQuan:"否"
                    })
                }
                message.success({content:"加载成功",key,duration:1})
            })
        })
    }
    dateFormat (value) {
        if (value === null) {
            return '';
        } else {
            const date = new Date(value);
            const y = date.getFullYear();// 年
            let MM = date.getMonth() + 1;// 月
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();// 日
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();// 时
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();// 分
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();// 秒
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    }
    teJiaJinEr(e){
        this.setState({
            teJiaJinEr:e.target.value
        })
    }
    youHui(){
        if(this.state.youHui ===0){
            this.setState({
                youHui:1
            },function () {
                console.log(this.state.youHui);
            })
        }
        else {
            this.setState({
                youHui:0
            },function () {
                console.log(this.state.youHui);
            })
        }
    }
    guiGeGuoLi(list){
        console.log(list);
        let guigeL = list
        for(let i = 0;i<guigeL.length;i++){
            if(!guigeL[i].isprice){
                guigeL[i].price = "无"
                guigeL[i].priceEndtime = "无"
            }
            else {
                guigeL[i].priceEndtime =this.dateFormat(guigeL[i].priceEndtime)
            }
        }

        this.setState({
            GuiGeList:guigeL
        },function () {
            console.log(this.state.GuiGeList);
        })
    }
    getGuanJianZi(list){
        let guanJianZi=list[0].flagName
        for(let x=1;x<list.length;x++){
            guanJianZi+="、"+list[x].flagName
        }
        this.setState({
            guanJianZi
        })
    }
    render() {
        const columns = [
            {
                title: '规格id',
                dataIndex: 'specificationsId',
                key: 'specificationsId',
            },
            {
                title: '规格名',
                dataIndex: 'specificationsName',
                key: 'specificationsName',
            },
            {
                title: '售价',
                dataIndex: 'salesPrice',
                key: 'salesPrice',
            },
            {
                title: '库存数量',
                key: 'stockNumber',
                dataIndex: 'stockNumber',
            },
            {
                title: '特价',
                key: 'price',
                dataIndex: 'price',
            },
            {
                title: '到期时间',
                key: 'priceEndtime',
                dataIndex: 'priceEndtime',
            },
            {
                title: '操作',
                render:(text,record) => (
                    this.teJiaXuanRan(text)
                )
            },
        ];
        function onChange(value, dateString) {
            this.setState({
                teTime:dateString
            })
        }

        function onOk(value) {
            console.log('onOk: ', value);
        }
        return (
            <div>
                <Button  type="primary" onClick={this.back.bind(this)}>返回</Button>
                <h2 style={{marginTop:50}}>商品详情</h2>
                <Row style={{marginTop:50}}>
                    <Col span={7}>商品名：{this.state.productMsg.goodsName}</Col>
                    <Col span={7}>商品分类：{this.state.productMsg.goodsTypeName}</Col>
                    <Col span={7}>商品品牌：{this.state.productMsg.goodBrandName}</Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={7}>商品重量：{this.state.productMsg.goodsWeight} KG</Col>
                    <Col span={7}>收取邮费：{this.state.productMsg.goodsFreight}元</Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={2}>商品封面图：</Col>
                    {this.state.FengMianImg}
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={2}>商品规格：</Col>
                    <Col span={20}>
                        <Table columns={columns} dataSource={this.state.GuiGeList} />
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>是否热销：{this.state.reXiao}</Col>
                    <Col span={7}>是否限时抢购：{this.state.qiangGou}</Col>
                    <Col span={7}>商品状态：{this.state.zhuangTai}</Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col span={2}>商品详情图：</Col>
                    {this.state.XiangQing}
                </Row>
                <Row style={{marginTop:50,marginBottom:100}}>
                    <Col span={7}>是否享受优惠券：{this.state.youHuiQuan}</Col>
                    <Col span={7}>商品关键字：{this.state.guanJianZi}</Col>
                </Row>
                <Row style={{marginTop:50,marginBottom:100}}>
                    <Col span={2}>商品详细：</Col>
                    <Col>
                        {this.state.productMsg.goodsIntroduce}
                    </Col>
                </Row>
                <Modal
                    title="开启特价"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Row>
                        <Col span={5} style={{textAlign:"right" ,lineHeight:"32px"}}>特价金额：</Col>
                        <Col span={16}><Input  onChange={this.teJiaJinEr.bind(this)} value={this.state.teJiaJinEr} placeholder="特价金额" style={{width:200}}/></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"32px"}}>到期时间：</Col>
                        <Col span={16}><DatePicker locale={locale} showTime onChange={onChange.bind(this)} onOk={onOk} style={{width:200}} /></Col>
                    </Row>
                    <Row style={{marginTop:30}}>
                        <Col span={5} style={{textAlign:"right",lineHeight:"26px"}}>享受优惠券：</Col>
                        <Col span={16}> <Switch onChange={this.youHui.bind(this)} /></Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export{ProductDetails as default}