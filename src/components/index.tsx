import Wrap from "./Wrap";
import Diamond from "./Diamond";
import Right from "./Right";
import Mask from "./Mask";

const Layout = (props) => {
  const { map, currentMap, isMask, score, time, level } = props;
  return (
    <div className="_1fjB">
      <Wrap />
      <div className="_2iZA">
        <div className="_2lJh">
          <Diamond map={map} />
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

export default Layout;
