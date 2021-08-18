import React, { Component } from "react";

class App extends Component {
  componentWillMount() {}
  componentWillUnmount() {}
  render() {
    var { show } = this.props;
    const content = (
      <div className="_20Jp" style={{ display: show ? "block" : "none" }}>
        <div className="bg AFTs _26pe"></div>
        <p>
          俄罗斯方块
          <br />
          TETRIS
        </p>
        <span>
          快捷键
          <br />
          上下左右键+空格{" "}
        </span>
      </div>
    );

    return content;
  }
}

export default App;
