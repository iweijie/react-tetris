import React, { memo } from "react";
import { map } from "lodash";
import styles from "./index.module.scss";

// 2 实 ； 1 虚
const left = [1,2,2,2,2,1,1,1,2,1,2,2,2,1,1,1,2,2,2,2,1,1,1,2,2,2,1,2,1,1,2,2,1,2,1,2,1,1,2,1,2,1,2,1,2,1];
const right = [2,1,2,2,1,2,1,1,1,2,2,2,1,2,1,1,2,2,2,2,1,1,2,1,2,2,2,1,1,1,2,2,1,2,1,2,1,1,1,2,1,2,1,2,1,2]

const Wrap = props => {
	return (
		<div className={styles["wrap"]}>
			<div className={styles["header"]}>
				<span className="l mr10" style={{ width: "40px" }}></span>
				<span className="l mr10"></span>
				<span className="l mr10"></span>
				<span className="l mr10"></span>
				<span className="l mr10"></span>
				<span className="r ml10" style={{ width: "40px" }}></span>
				<span className="r ml10"></span>
				<span className="r ml10"></span>
				<span className="r ml10"></span>
				<span className="r ml10"></span>
			</div>
			<h1>俄罗斯方块</h1>
			<div className={` ${styles["adorn"]}`}>
				{
					map(right,(i,key)=>{
						if(i === 2) return <b key={key} className="c"></b>
						return <em key={key}></em>
					})
				}
			</div>
			<div className={`${styles["left"]} ${styles["adorn"]}`}>
				{
					map(left,(i,key)=>{
						if(i === 2) return <b key={key} className="c"></b>
						return <em key={key}></em>
					})
				}
			</div>
			
		</div>
	);
};

export default memo(Wrap);
