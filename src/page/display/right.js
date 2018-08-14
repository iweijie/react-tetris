import React, { Component } from 'react'

class App extends Component {
//   constructor (props) {
//     super(props)
//   }
  componentWillMount () {}
  componentWillUnmount () {}
  render () {
    let {currentMap} = this.props;
    let next = currentMap.next;
    
    let nextCom ;
    if(next){
        let {index,site} = next;
        let {map,info} = site[index];
        let {b,len} = info;
        b = b || 0
        let l = len -b -1
        nextCom = <div className="_3Wmt">
            <div>
                {
                    map[l-1].map((v,k)=>{
                        if(v){
                            return <b key={k} className="c"></b>
                        } 
                        return <b  key={k}></b>
                    })
                }
            </div>
            <div>
                {
                    map[l].map((v,k)=>{
                        if(v){
                            return <b key={k} className="c"></b>
                        } 
                        return <b key={k}></b>
                    })
                }
            </div>
        </div>

    }else {
        nextCom = <div className="_3Wmt"></div>
    }
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
                {nextCom}
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
