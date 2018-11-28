
import React, {Component} from 'react';
import Wrap from "./wrap"
import Diamonds from "./diamonds"
import Right from "./right"
import Mask from "./mask"
class App extends Component {
    render() {
        var {map,currentMap,isMask,score,time,level} = this.props;
        const content = (
            <div className="_1fjB">
                <Wrap />
                <div className="_2iZA">
                    <div className="_2lJh">
                        <Diamonds map={map}/>
                        <Mask show={isMask}/>
                        <Right time={time} score={score} level={level} currentMap={currentMap}/>
                    </div>
                </div>
            </div>
        )

        return (
            content
        );
    }
}

export default App