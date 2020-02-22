import React from "react";
import Number from "../../component/Number";
import Next from "../../component/Next";
import styles from "./index.module.scss";

const getTimeCom = time => {
	var difference = Math.round(time / 1000);
	var minute = Math.floor(difference / 60);
	var second = difference % 60;
	var arr = [];
	if (minute < 10) {
		arr.push(0, minute);
	} else {
		arr.push(Math.floor(minute / 10), minute % 10);
	}
	arr.push(12);
	if (second < 10) {
		arr.push(0, second);
	} else {
		arr.push(Math.floor(second / 10), second % 10);
	}
	return arr;
};

// 01234567890；10-灰色8；11-灰色：; 12-：;

const Right = props => {
	let { score, time, level, next } = props;
	return (
		<div className={styles["right"]}>
			<div>
				<p>最高分</p>
				<Number num={score} len={6} />
			</div>
			<p>起始行</p>
			<Number num={score} len={6} />
			<p>级别</p>
			<Number num={level} len={6} />
			<p>下一个</p>
			<Next next={next} />
			<div className={styles["time"]}>
				<div className="bg EHci"></div>
				<div className="bg _37mu"></div>
				<Number num={getTimeCom(time)} len={5} />
			</div>
		</div>
	);
};

export default Right;
