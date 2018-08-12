import React, { Component } from 'react'
import { connect } from 'react-redux'
import dispatchAction from 'util/dispatchAction'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {}
  componentWillUnmount () {}
  render () {
    const content = (
            <div className="_1deS">
                <div>
                    <p>最高分</p>
                    <div className="iHKP"><span className="bg _2kln"></span><span className="bg _2kln"></span><span className="bg _2kln"></span><span
                        className="bg _2kln"></span><span className="bg _2kln"></span><span className="bg _2hru"></span></div>
                </div>
                <p>起始行</p>
                <div className="iHKP"><span className="bg _2kln"></span><span className="bg _2kln"></span><span className="bg _2kln"></span><span className="bg _2kln"></span><span
                    className="bg _2kln"></span><span className="bg _2hru"></span></div>
                <p>级别</p>
                <div className="iHKP"><span className="bg _2B-l"></span></div>
                <p>下一个</p>
                <div className="_3Wmt">
                    <div><b className=""></b><b className="c"></b><b className=""></b><b className=""></b></div>
                    <div><b className="c"></b><b className="c"></b><b className="c"></b><b className=""></b></div>
                </div>
                <div className="_8hag">
                    <div className="bg EHci"></div>
                    <div className="bg _37mu"></div>
                    <div className="iHKP"><span className="bg _2B-l"></span><span className="bg _2V1K"></span><span className="bg hOfM"></span><span className="bg _3bYF"></span><span
                        className="bg _3bYF"></span></div>
                </div>
            </div>

    )

    return (
      content
    )
  }
}

export default App
