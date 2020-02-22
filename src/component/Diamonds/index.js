import React from "react";
import { map, get, includes } from "lodash";
import styles from "./index.module.scss";

const getPositionStyle = (coord = []) => {
	const [left, top] = coord;
	return {
		left: left * 22 + "px",
		top: top  * 22 + "px"
	};
};

const Diamonds = props => {
	const { block, coord } = props;
	return (
		<div className={styles["wrap"]}>
			<div className={styles["diamonds-wrap"]}>
				{map(get(props, "map", []), (v, k) => {
					let bs = v.map((val, kes) => {
						let className = val ? (val === 1 ? "c" : "d") : "";
						return <b key={kes} className={className}></b>;
					});
					return <p key={k}>{bs}</p>;
				})}

				<div className={styles["block"]} style={getPositionStyle(coord)}>
					{map(get(block, "map", []), (item, k) => {
						return (
							<div key={k} className={styles["block-item"]}>
								{map(item, (val, kes) => {
									let className = val ? "c" : styles["block-chunk"];
									return <b key={kes} className={className}></b>;
								})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Diamonds;
