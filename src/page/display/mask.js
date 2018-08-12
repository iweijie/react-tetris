import React, { Component } from 'react'
import { connect } from 'react-redux'
import dispatchAction from 'util/dispatchAction'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {}
  componentWillUnmount () {}
  render () {
    var {show} = this.props;
    const content = (
        <div className="_20Jp" style={{display: show?"block":"none"}}>
            <div className="bg AFTs _26pe"></div>
            <p>俄罗斯方块<br/>TETRIS</p>
        </div>

    )

    return (
      content
    )
  }
}

export default App
