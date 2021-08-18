import React, { Component } from "react";

class App extends Component {
  render() {
    let { map } = this.props;
    const content = (
      <div className="_6pVK">
        {map.map((v, k) => {
          let bs = v.map((val, kes) => {
            let className = val ? (val === 1 ? "c" : "d") : "";
            return <b key={kes} className={className}></b>;
          });
          return <p key={k}>{bs}</p>;
        })}
      </div>
    );

    return content;
  }
}

export default App;
