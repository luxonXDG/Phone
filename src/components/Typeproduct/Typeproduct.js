import React from 'react';  //导入react
//xxx 组件名
class typeproduct extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

//渲染
    render() {
        return (
            <div>
              <h2>类型管理</h2>
            </div>
        )
    }
}

export {typeproduct as default}
