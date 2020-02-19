import React from "react";
import { map, get } from "lodash";
import styles from "./index.module.scss";

const Diamonds = props => {
	return (
		<div className={styles["diamonds-wrap"]}>
			{map(get(props, "map", []), (v, k) => {
				let bs = v.map((val, kes) => {
					let className = val ? (val === 1 ? "c" : "d") : "";
					return <b key={kes} className={className}></b>;
				});
				return <p key={k}>{bs}</p>;
			})}
		</div>
	);
};

export default Diamonds;
