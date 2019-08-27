import React, { Component } from 'react';

class App2 extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  }
  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize', this.onResize, false)
  }
  // 有可能会忘记解绑导致内存泄漏
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }
  componentDidUpdate() {
    document.title = this.state.count
  }
  render() {
    const { count, size } = this.state
    return (
      <button
        type = 'button'
        onClick={() => {this.setState({count: this.state.count + 1})}}>
        count{count}
        size:{size.width}x{size.height}
      </button> 
    )
  }
}
export default App2;