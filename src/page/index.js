import React, { Component } from 'react';
import './index.css';
import { nextMap } from "../select/index"
import Tetris from "../page/display/index"
import Control from "../page/control/index"
import { connect } from 'react-redux';
import dispatchAction from "../util/dispatchAction"
import { isEmpty } from 'lodash'
class App extends Component {
    state = {
        // 1  PC  0 移动
        isPC: 1
    }
    diedState = false;
    redArr = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    completeArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    plainArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // 加分项
    scoreMap = [0, 1, 3, 6, 10]
    // 等级项
    levelMap = [0, 100, 80, 60, 45, 30, 20]
    // 动画标识
    isAnimate = false;
    // 暂停
    stop = null;
    // 更新时间
    updateTime = 0;
    // 控制下落速度
    speed = 100;
    currentLevel = 100;
    time = 0

    // 碰撞检测函数
    handleCollide = (map) => {
        let { currentMap, controlNextAction, setAction } = this.props;
        this.speed = this.currentLevel;
        currentMap.autoDown = false;
        if (this.isGameOver()) {
            this.isAnimate = true
            this.stop()
            this.gameOverAnimate()
                .then(() => {
                    const { controlStartAction, maskAction } = this.props
                    this.isAnimate = false
                    this.diedState = true;
                    maskAction(true)
                    controlStartAction()
                })
            return
        }
        let componentIndexList = this.isComplete(map);
        if (!isEmpty(componentIndexList)) {
            this.stop()
            this.completeAnimate(map, componentIndexList)
                .then(() => {
                    this.start()
                    this.complete(map, componentIndexList)
                })
            return
        }

        setAction(map)
        controlNextAction()
    }
    // 检测是否有已完成的
    isComplete = (map) => {
        let arr = []
        for (let i = 0; i < map.length; i++) {
            if (!map[i].includes(0)) {
                arr.push(i)
            }
        }
        if (arr.length) return arr
    }
    // 是否GG
    isGameOver = () => {
        let { currentMap } = this.props;
        let { index, seat, site } = currentMap;
        let { info } = site[index];
        let bottom = seat[1];
        let { t = 0, b = 0, len } = info
        return (len - t - b >= bottom)
    }
    // 死亡动画
    gameOverAnimate = () => {
        let { map, setAction } = this.props;
        let len = map.length - 1,
            i = len,
            timerId,
            newmap = map;
        return new Promise((resolve) => {
            timerId = setInterval(() => {
                newmap = [...newmap];
                newmap[i] = this.completeArr
                setAction(newmap)
                i--;
                if (i < 0) {
                    clearInterval(timerId)
                    i = 0;
                    timerId = setInterval(() => {
                        newmap = [...newmap];
                        newmap[i] = this.plainArr
                        setAction(newmap)
                        i++;
                        if (i > len) {
                            clearInterval(timerId)
                            resolve()
                        }
                    }, 40)
                }
            }, 40)
        })
    }
    // 已完成动画
    completeAnimate = (map, arr) => {
        this.isAnimate = true
        return new Promise((resolve) => {
            this.changeRed(map, arr)
            setTimeout(() => {
                this.isAnimate = false
                resolve()
            }, 900)
        })
    }
    // 完成事件
    complete = (map, arr) => {
        let { setAction, controlNextAction, scoreAction } = this.props;
        arr = arr.sort((a, b) => {
            return b - a
        })
        arr.forEach(v => {
            map.splice(v, 1)
        })
        arr.forEach(v => {
            map.unshift(this.plainArr)
        })
        // 设置 map
        setAction(map)
        // 加分
        scoreAction(this.scoreMap[arr.length])
        // 增加下一个
        controlNextAction()
    }
    changeRed = (map, arr) => {
        let { setAction } = this.props;
        arr.forEach(v => {
            map[v] = this.redArr
        })
        setAction(map)
    }
    delayed = 0;
    // 开始
    start = (...args) => {
        if (this.stop || this.isAnimate) return;
        if (this.diedState) {
            this.diedState = false;
            let { resetAction } = this.props;
            resetAction()
        }
        let { contorltime, changeTimeAction } = this.props
        if (contorltime === 0) {
            changeTimeAction(Date.now())
        } else if (this.delayed) {
            changeTimeAction(Date.now() - this.delayed)
            this.delayed = 0
        }
        let flag = true
        let { autoDown } = this
        let callback = () => {
            this.updateTime++
            if (this.updateTime >= 60) {
                this.updateTime = 0
                this.setState({})
            }
            if (flag) {
                autoDown(...args)
                requestAnimationFrame(callback)
            } else {
                callback = null;
            }
        }
        requestAnimationFrame(callback)
        this.stop = () => {
            this.delayed = Date.now()
            flag = false
            this.stop = null
            this.setState({})
        }
    }
    decoratorHandle = (fn) => {
        let { maskAction, contorlMask } = this.props;
        let arr = [32, 37, 39, 38, 40];
        return (e) => {
            if (!arr.includes(e.keyCode)) return;
            if (!this.stop) {
                if (contorlMask) {
                    maskAction(false)
                }
                this.start()
            } else {
                fn(e)
            }
        }
    }
    // 变换
    transform = () => {
        var { isTransform } = this.props.nextMap
        if (!isTransform) return
        let { currentMap, controlChangeAction } = this.props;
        let { index, site, seat } = currentMap;
        let [left, bottom] = seat;
        let info = site[index].info;
        if (left < 0 || left + info.len > 10) return
        if (bottom > 19) return
        if (index + 1 >= site.length) {
            index = 0
        } else {
            index += 1
        }
        controlChangeAction({
            index
        })
    }
    // 平移 flag  1 左； -1 右
    translation = (flag) => {
        let { currentMap, controlChangeAction, nextMap } = this.props;
        let { isTranslationLeft, isTranslationRight } = nextMap
        let { index, site, seat } = currentMap;
        let { info } = site[index];
        let [left] = seat;
        let newLeft;
        if (flag === 1) {
            if (!isTranslationLeft) return
            if (left > 0 || -info.l < left) {
                newLeft = left - 1
            }
        } else {
            if (!isTranslationRight) return
            if (left < 10 - info.len || 10 > left + info.len - info.r) {
                newLeft = left + 1
            }
        }
        if (newLeft !== undefined) {
            controlChangeAction({
                seat: [newLeft, seat[1]]
            })
        }
    }
    autoDown = () => {
        this.time++;
        if (this.time < this.speed) return;
        this.down()
    }
    down = () => {
        this.time = 0;
        let { currentMap, controlChangeAction, nextMap } = this.props;
        let { index, site, seat, autoDown } = currentMap;
        if (!autoDown) return;
        let { info } = site[index];
        let top = seat[1];
        let bottom = info.b || 0;
        if (top - Number(bottom) < 19) {
            controlChangeAction({
                seat: [seat[0], top + 1]
            })
        } else {
            this.handleCollide(nextMap.map)
        }
    }
    // 提升等级
    updateLevel = (next) => {
        var { levelAction, contorllevel, contorltime } = next
        var now = Date.now()
        if ((now - contorltime - contorllevel * 60 * 1000) > (2 * 60 * 1000)) {
            levelAction(++contorllevel)
        }
    }
    isDeviceTypePc = () => {
        return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
    }
    componentDidMount() {
        window.addEventListener("keydown", this.decoratorHandle(this.keydownHandle))
        window.addEventListener("keyup", this.keyupHandle)
        var { controlStartAction, contorllevel } = this.props;
        this.speed = this.currentLevel = this.levelMap[contorllevel]
        controlStartAction()
        if (!this.isDeviceTypePc()) {
            this.setState({
                isPC: 0
            })
        }
    }
    componentWillReceiveProps(next) {
        if (next.contorllevel !== this.props.contorllevel) {
            this.speed = this.currentLevel = this.levelMap[next.contorllevel]
        }
    }
    componentDidUpdate() {
        this.updateTime = 0
        var { collide, map } = this.props.nextMap;
        if (collide) {
            this.handleCollide(map)
        }
    }
    // 控制键盘事件
    keyFlag = true;
    keydownHandle = (e) => {
        if (!this.keyFlag) return;
        this.keyFlag = false
        switch (e.keyCode) {
            case 32:
                this.speed = 1;
                return;
            case 37:
                return this.translation(1)
            case 39:
                return this.translation(-1)
            case 38:
                return this.transform()
            case 40:
                this.speed = 1;
                return;
            default:
                return

        }
    }
    keyupHandle = (e) => {
        this.keyFlag = true
        switch (e.keyCode) {
            case 32:
                this.speed = this.currentLevel;
                return;
            case 40:
                this.speed = this.currentLevel;
                return;
            default:
                return
        }

    }
    render() {
        const { isPC } = this.state
        let { stop, translation, down, transform, decoratorHandle } = this;
        let { currentMap, nextMap, contorlMask, contorlscore, contorltime, contorllevel } = this.props;
        let time;
        if (contorltime) {
            time = Date.now() - contorltime
        } else {
            time = 0
        }
        const scale = isPC ? 0.8 : 1
        return (
            <div data-reactroot="" className="wrap" style={{ transform: `scale(${scale})`, paddingTop: "101px", paddingBottom: "59px", marginTop: "-569px" }}>
                <Tetris time={time} level={contorllevel} score={contorlscore} isMask={contorlMask} currentMap={currentMap} map={nextMap.map} />
                <Control
                    down={decoratorHandle(down)}
                    stop={stop}
                    transform={decoratorHandle(transform)}
                    translation={decoratorHandle(translation)} />
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        nextMap: nextMap(store),
        map: store.map,
        contorlMask: store.contorlMask,
        currentMap: store.currentMap,
        contorlscore: store.contorlscore,
        contorllevel: store.contorllevel,
        contorltime: store.contorltime,
        ...ownProps
    }
}

export default connect(mapStateToProps, dispatchAction)(App)
