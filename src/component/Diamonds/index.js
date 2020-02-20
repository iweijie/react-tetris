import React from "react";
import { map, get, includes } from "lodash";
import styles from "./index.module.scss";

const getPositionStyle = (coord = [], block) => {
	const [left, top] = coord;
	const info = get(block, "info", { t: 0, l: 0, b: 0, r: 0 });
	const { t, l, b, len } = info;
	return {
		left: left * 22 + "px",
		top: (top - (len - b - t)) * 22 + "px"
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

				<div className={styles["block"]} style={getPositionStyle(coord, block)}>
					{map(get(block, "map", []), (item, k) => {
						// if (includes(item, 1)) {
							return (
								<div key={k} className={styles["block-item"]}>
									{map(item, (val, kes) => {
										let className = val ? "c" : styles["block-chunk"];
										return <b key={kes} className={className}></b>;
									})}
								</div>
							);
						// }
						// return null;
					})}
				</div>
			</div>
		</div>
	);
};

export default Diamonds;
