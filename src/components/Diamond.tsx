import { FC } from "react";
import { map } from "lodash";

import { MapType } from "../type";

const Diamond: FC<{ map: MapType }> = ({ map: list }) => {
  return (
    <div className="_6pVK">
      {map(list, (v, k) => {
        const bs = map(v, (val, kes) => {
          const className = val ? (val === 1 ? "c" : "d") : "";
          return <b key={kes} className={className}></b>;
        });
        return <p key={k}>{bs}</p>;
      })}
    </div>
  );
};

export default Diamond;
