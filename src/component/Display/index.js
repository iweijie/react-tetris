import React from "react";

import Diamonds from "../Diamonds";
import Right from "../Right";
import Mask from "../Mask";
import Wrap from "../Wrap";

const Display = props => {
	const { map, currentMap, isMask, score, time, level, block, coord } = props;

	return (
		<div className="_1fjB">
			<Wrap />
			<div className="_2iZA">
				<div className="_2lJh">
					<Diamonds map={map} block={block} coord={coord} />
					<Mask show={isMask} />
					<Right
						time={time}
						score={score}
						level={level}
						currentMap={currentMap}
					/>
				</div>
			</div>
		</div>
	);
};
export default Display;
