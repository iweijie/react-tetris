import React from "react";
import styles from "./index.module.scss";
import { times } from "lodash";

const classMap = times(13, n => {
	const c = `num${n}`;
	return `bg ${styles[c]}`;
});

const getNumberList = (num, len) => {
	if (Array.isArray(num)) return num.map(v => classMap[v]);
	let arr = String(num).split("");
	if (len) {
		while (arr.length < len) {
			arr.unshift(10);
		}
	}
	return arr.map(v => classMap[v]);
};

const NumberCom = ({ num, len }) => {
	return (
		<div className={styles["wrap"]}>
			{getNumberList(num, len).map((v, k) => (
				<span className={v} key={k}></span>
			))}
		</div>
	);
};

export default NumberCom;
