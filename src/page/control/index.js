
import React, {Component} from 'react';
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction" 
import {debounce} from "util/baseTool"
class App extends Component {
    // constructor(props){
    //     super(props);
    // }
    componentWillMount(){
    }
    componentDidMount(){
        // this.props.controlStartAction()
        // this.autoStart()
    }
    // autoStart = ()=>{
    //     var {start} = this.props;
    //     start(this.autoDown,this)
    // }
    // transform = ()=>{
    //     var {currentMap,controlChangeAction} = this.props;
    //     var {index,site} = currentMap;
    //     if(index + 1 >= site.length){
    //         index = 0
    //     }else {
    //         index += 1
    //     }
    //     controlChangeAction({
    //         index
    //     })
    // }
    // // 变换
    // transform = ()=>{
    //     var {currentMap,controlChangeAction} = this.props;
    //     var {index,site,seat} = currentMap;
    //     var [left] = seat;
    //     var info = site[index].info;
    //     if(left < 0 || left + info.len > 10) return
    //     if(index + 1 >= site.length){
    //         index = 0 
    //     }else {
    //         index += 1
    //     }
    //     var nextInfo = site[index].info;

    //     controlChangeAction({
    //         index
    //     })
    // }
    // // 平移 flag  1 左； -1 右
    // translation = (flag)=>{
    //     let {currentMap,controlChangeAction} = this.props;
    //     let {index,site,seat} = currentMap;
    //     let {info} = site[index];
    //     let [left] = seat;
    //     let newLeft;
    //     if(flag === 1){
    //         if(left > 0 || -info.l < left ){
    //             newLeft = left-1
    //         }
    //     }else {
    //         if(left < 10-info.len || 10>left + info.len - info.r){
    //             newLeft = left+1
    //         }
    //     }
    //     if(newLeft !== undefined){
    //         controlChangeAction({
    //             seat:[newLeft,seat[1]]
    //         })
    //     }
    // }
    // // 控制下落速度
    // speed = 100
    // time = 0
    // autoDown = ()=>{
    //     this.time ++ ;
    //     if(this.time < this.speed) return ;
    //     this.down()
    // }
    // down = ()=>{
    //     this.time = 0 ;
    //     let {currentMap,controlChangeAction,stop} = this.props;
    //     let {index,site,seat,autoDown} = currentMap;
    //     if(!autoDown) return;
    //     let {info} = site[index];
    //     let top = seat[1];
    //     let bottom = info.b || 0;
    //     if(top - Number(bottom) < 19){
    //         controlChangeAction({
    //             seat:[seat[0],top+1]
    //         })
    //     }else {
    //         console.log("到底了")
    //         stop()
    //     }
    // }
    render() {
        let {down,stop,start,transform,translation} = this.props;
        // style={{marginTop: "20px"}}
        var translationHandle = debounce(translation,100)
        const content = (
            <div className="control" style={{marginTop: "79px"}}>
                <div onClick={debounce(transform,100)} className="_1pg0 _23pZ _2TvZ" style={{top: "0px", left: "374px"}}>
                    <i  className=""></i>
                    <em style={{transform: "translate(0px, 63px) scale(1, 2)"}}></em>
                    <span className="_1zCL">旋转</span>
                </div>
                <div onClick={debounce(down,20)} className="_1pg0 _23pZ _2TvZ" style={{top: "180px", left: "374px"}}><i className=""></i><em style={{transform: "translate(0px, -71px) rotate(180deg) scale(1, 2)"}}></em><span
                    className="">下移</span></div>
                <div onClick={()=>translationHandle(1)} className="_1pg0 _23pZ _2TvZ" style={{top: "90px", left: "284px"}}><i className=""></i><em style={{transform: "translate(60px, -12px) rotate(270deg) scale(1, 2)"}}></em><span
                    className="">左移</span></div>
                <div onClick={()=>translationHandle(-1)} className="_1pg0 _23pZ _2TvZ" style={{top: "90px", left: "464px"}}><i className=""></i><em style={{transform: "translate(-60px, -12px) rotate(90deg) scale(1, 2)"}}></em><span
                    className="">右移</span></div>
                <div  className="_1pg0 _23pZ p4fG" style={{top: "100px", left: "52px"}}><i className=""></i><span className="">掉落 (SPACE)</span></div>
                <div className="_1pg0 _3kg_ oW6K" style={{top: "0px", left: "196px"}}><i className=""></i><span className="">重玩(R)</span></div>
                <div className="_1pg0 RBZg oW6K" style={{top:" 0px", left: "106px"}}><i className=""></i><span className="">音效(S)</span></div>
                <div className="_1pg0 RBZg oW6K" style={{top: "0px", left: "16px"}}><i className=""></i><span className="">暂停(P)</span></div>
            </div>
        )

        return (
            content
        );
    }
}
// const mapStateToProps = (store,ownProps)=>{
// 	return {
//         map:store.map,
//         currentMap:store.currentMap,
//         ...ownProps
// 	}
// }

// export default connect(mapStateToProps,dispatchAction)(App)
export default App