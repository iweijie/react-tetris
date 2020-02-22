import React, { Component } from "react";
// import "./index.css";
import Display from "@/component/Display";
import Hand from "@/component/Hand";
import { connect } from "react-redux";
import dispatchAction from "@/utils/dispatchAction";
import control from "@/control";
class App extends Component {
	constructor(props) {
		super(props);
		this.control = control;
	}
	componentDidMount() {
		// window.addEventListener(
		// 	"keydown",
		// 	this.decoratorHandle(this.keydownHandle)
		// );
		// window.addEventListener("keyup", this.keyupHandle);
		// var { controlStartAction, contorllevel } = this.props;
		// this.speed = this.currentLevel = this.levelMap[contorllevel];
		// controlStartAction();
		// if (!this.isDeviceTypePc()) {
		// 	this.setState({
		// 		isPC: 0
		// 	});
		// }
	}
	componentWillReceiveProps(next) {
		// if (next.contorllevel !== this.props.contorllevel) {
		// 	this.speed = this.currentLevel = this.levelMap[next.contorllevel];
		// }
	}
	componentDidUpdate() {
		// this.updateTime = 0;
		// var { collide, map } = this.props.nextMap;
		// if (collide) {
		// 	this.handleCollide(map);
		// }
	}

	render() {
		console.log(this.props);
		const {
			map,
			level,
			status,
			topScore,
			score,
			startTime,
			time,
			blockIndex,
			block,
			nextBlock,
			blockSite,
			blockCoord
		} = this.props;
		// let {
		// 	stop,
		// 	translation,
		// 	down,
		// 	transform,
		// 	decoratorHandle,
		// 	selfStarting,
		// 	gameOver
		// } = this;
		return (
			<div
				className="wrap"
				style={{
					paddingTop: "101px",
					paddingBottom: "59px",
					marginTop: "-569px"
				}}
			>
				<Display
					time={time}
					level={level}
					score={score}
					isMask={status === 0}
					currentMap={blockSite}
					map={map}
					block={block}
					coord={blockCoord}
					next={nextBlock}
				/>
				<Hand
				// down={down}
				// stop={stop}
				// start={selfStarting}
				// restart={gameOver}
				// transform={transform}
				// translation={translation}
				/>
			</div>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
	return store.block;
	// return {
	// nextMap: nextMap(store),
	// map: store.map,
	// contorlMask: store.contorlMask,
	// currentMap: store.currentMap,
	// contorlscore: store.contorlscore,
	// contorllevel: store.contorllevel,
	// contorltime: store.contorltime,
	// ...ownProps
	// };
};

export default connect(mapStateToProps, dispatchAction)(App);
