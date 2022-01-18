import { FC } from "react";
import Wrap from "./Wrap";
import Diamond from "./Diamond";
import Right from "./right11";
import Mask from "./mask22";

const App = (props: any) => {
  const { map, currentMap, isMask, score, time, level } = props;
  return (
    <div className="_1fjB">
      <Wrap />
      <div className="_2iZA">
        <div className="_2lJh">
          <Diamond />
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

export default App;
