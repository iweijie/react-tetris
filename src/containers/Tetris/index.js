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
		window.addEventListener("keydown", this.keydownhandle);
		window.addEventListener("keyup", this.keyuphandle);
		// this.control.start();
	}

	// 分发事件函数
	keydownhandle = e => {
		const { isAnimation } = this.props;
		if (isAnimation) return;
		switch (e.keyCode) {
			case 32:
				// this.control.fastDown();
				this.control.down()
				return;
			case 37:
				return this.control.move(0);
			case 39:
				return this.control.move(1);
			case 38:
				return this.control.transform();
			case 40:
				// this.control.fastDown();
				this.control.down()
				return;
			default:
				return;
		}
	};

	// 分发事件函数
	keyuphandle = e => {
		switch (e.keyCode) {
			case 32:
				this.control.cancelFastDown();
				return;
			case 40:
				this.control.cancelFastDown();
				return;
			default:
				return;
		}
	};

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
			completeIndexList,
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
					completeIndexList={completeIndexList}
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
