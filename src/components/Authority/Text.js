import React from 'react';  //导入react
//xxx 组件名
class Text extends React.Component {
//构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {

    }

//渲染
    render() {
        return (
            <div>
              <h2>测试</h2>
            </div>
        )
    }
}

export {Text as default}
