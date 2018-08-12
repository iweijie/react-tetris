import React, { Component } from 'react';
import './index.css';
import Tetris from "../page/display/index"
import Control from "../page/control/index"
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction"
class App extends Component {
    siteMap = []
    redArr = [2,2,2,2,2,2,2,2,2,2]
    plainArr = [0,0,0,0,0,0,0,0,0,0]
    // 碰撞函数
    collideHandle = (map)=>{
        let {currentMap,controlNextAction,setAction} = this.props;
        
        currentMap.autoDown = false ;
        let arr = this.isComplete(map);
        if(arr){
            this.stop()
            this.completeAniment(map,arr)
            .then(()=>{
                this.complete(map,arr)
            })
        }else {
            setAction(map)
            controlNextAction()
        }
        return map
    }
    // 检测是否有已完成的
    isComplete = (map)=>{
        let arr = []
        for(let i = 0;i<map.length;i++){
            if(!map[i].includes(0)) {
                arr.push(i)
            }
        }
        if(arr.length) return arr
    }
    // 已完成动画
    completeAniment = (map,arr)=>{
        return new Promise((resolve)=>{
                this.changeRed(map,arr)
                setTimeout(()=>{
                    resolve()
                },900)
        })
    }
    // 完成事件
    complete = (map,arr)=>{
        let {setAction,controlNextAction} = this.props;
        arr = arr.sort((a,b)=>{
            return b - a
        })
        arr.forEach(v=>{
            map.splice(v,1)
        })
        arr.forEach(v=>{
            map.unshift(this.plainArr)
        })
        this.start()
        setAction(map)
        controlNextAction()
    }
    changeRed = (map,arr)=>{
        let {setAction} = this.props;
        arr.forEach(v=>{
            map[v] = this.redArr
        })
        setAction(map)
    }
    //  混合当前的 currentMap 到 Map 中
    blendHandle = (map,currentMap)=>{
        if(!currentMap || !currentMap.site) return [];
        let {index,seat,site,autoDown} = currentMap;
        if(!autoDown) return map;
        let newMap = [...map];
        let now = site[index].map;
        let info = site[index].info;
        let len = now.length -1 ;
        let [l,t] = seat;
        let showArr = [];
        now.forEach((v,k)=>{
            let s = t-len + k
            if(s>=0){
                showArr.push({
                    line:s,
                    value:v
                })
            }
        })
        for(let i =0;i<showArr.length;i++){
            let v = showArr[i];
            let {line,value} = v;
            if(line >= 20) continue ;
            let arr = [...newMap[line]];
            let spliceArr;
            let collide = false ;
            if(l >= 0){
                spliceArr = arr.splice(l,info.len)
                spliceArr = spliceArr.map((val,k)=>{
                    if(value[k] === 1 && val === 1){
                        collide = true
                    }
                    return value[k] || val
                })
                arr.splice(l,0,...spliceArr)
            }else {
                let abs = Math.abs(l);
                let len = info.len - abs;
                spliceArr = arr.splice(0,len);
                let newspliceArr = spliceArr.map((val,k)=>{
                    if(value[k+abs] === 1 && val === 1){
                        collide = true
                    }
                    return value[k+abs] || val
                })
                arr.splice(0,0,...newspliceArr)
    
            } 
            if(collide){
                return this.collideHandle(this.siteMap)
                 
            }
            newMap.splice(line,1,arr)
        }
        return this.siteMap = newMap
    }
    // 用于控制 requestAnimationFrame
    startFlag = false
    // 开始
    start = (...args)=>{
        this.startFlag = true
        let {autoDown} = this
        let callback = ()=>{
            if(this.startFlag){
                autoDown(...args)
                requestAnimationFrame(callback)
            }else {
                callback = null;
            }
        }
        requestAnimationFrame(callback)
    }
    // 暂停
    stop = ()=>{
        this.startFlag = false
    }
    // 变换
    transform = ()=>{
        let {currentMap,controlChangeAction} = this.props;
        let {index,site,seat} = currentMap;
        let [left] = seat;
        let info = site[index].info;
        if(left < 0 || left + info.len > 10) return
        if(index + 1 >= site.length){
            index = 0 
        }else {
            index += 1
        }
        // let nextInfo = site[index].info;
        controlChangeAction({
            index
        })
    }
    // 平移 flag  1 左； -1 右
    translation = (flag)=>{
        let {currentMap,controlChangeAction} = this.props;
        let {index,site,seat} = currentMap;
        let {info} = site[index];
        let [left] = seat;
        let newLeft;
        if(flag === 1){
            if(left > 0 || -info.l < left ){
                newLeft = left-1
            }
        }else {
            if(left < 10-info.len || 10>left + info.len - info.r){
                newLeft = left+1
            }
        }
        if(newLeft !== undefined){
            controlChangeAction({
                seat:[newLeft,seat[1]]
            })
        }
    }
    // 控制下落速度
    speed = 100
    time = 0
    autoDown = ()=>{
        this.time ++ ;
        if(this.time < this.speed) return ;
        this.down()
    }
    down = ()=>{
        this.time = 0 ;
        let {currentMap,controlChangeAction} = this.props;
        let {index,site,seat,autoDown} = currentMap;
        if(!autoDown) return;
        let {info} = site[index];
        let top = seat[1];
        let bottom = info.b || 0;
        if(top - Number(bottom) < 19){
            controlChangeAction({
                seat:[seat[0],top+1]
            })
        }else {
            console.log(this.siteMap)
            this.collideHandle(this.siteMap)
            console.log("到底了")
        }
    }
    componentDidMount(){
        var {controlStartAction} =this.props
        controlStartAction()
        this.start()
    }
    render() {
        let {start,stop,translation,down,transform} = this;
        let {map,currentMap} = this.props;
        let newMap = this.blendHandle(map,currentMap);
        // transform: scale(0.988542);
        return (
        <div data-reactroot="" className="wrap" style={{transform: "scale(1)", paddingTop: "101px", paddingBottom: "59px", marginTop: "-569px"}}>
            <Tetris map={newMap}/>
            <Control 
            down={down}
            stop={stop}
            start={start}
            transform={transform}
            translation={translation}/>
        </div>
        );
    }
}

const mapStateToProps = (store,ownProps)=>{
	return {
        map:store.map,
        currentMap:store.currentMap,
        ...ownProps
	}
}

export default connect(mapStateToProps,dispatchAction)(App)
