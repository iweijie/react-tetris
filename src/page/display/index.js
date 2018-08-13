
import React, {Component} from 'react';
import Wrap from "./wrap"
import Diamonds from "./diamonds"
import Right from "./right"
import Mask from "./mask"
class App extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){

    }
    componentWillUnmount(){
        
    }
    render() {
        var {map,currentMap} = this.props;
        const content = (
            <div className="_1fjB">
                <Wrap />
                <div className="_2iZA">
                    <div className="_2lJh">
                        <Diamonds map={map}/>
                        <Mask show={false}/>
                        <Right currentMap={currentMap}/>
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