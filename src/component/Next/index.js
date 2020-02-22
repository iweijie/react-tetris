import React, { memo } from "react";
import styles from "./index.module.scss";
import { slice, isEmpty, map } from "lodash";

const NextCom = ({ next }) => {
	if (isEmpty(next)) return null;
	let { blockIndex, blockSite } = next;
	let { info } = blockSite[blockIndex];
	const { b = 0, t = 0, len } = info;
	const list = slice(blockSite[blockIndex].map, t, len - b);
	return (
		<div className={styles["next"]}>
			{map(list, (item, index) => {
				return (
					<div key={index}>
						{map(item, (v, k) => {
							if (v) {
								return <b key={k} className="c"></b>;
							}
							return <b key={k}></b>;
						})}
					</div>
				);
			})}
		</div>
	);
};

export default memo(NextCom);
