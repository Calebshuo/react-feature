import React, { Component, useState } from 'react';

class App extends Component {
  state = {
    count: 0,
  }
  render() {
    const { count, size } = this.state
    return (
      <button
        type = 'button'
        onClick={() => {this.setState({count: this.state.count + 1})}}>
        count{count}
      </button> 
    )
  }
}

// let id = 0
function App2() {
  // let name, setName
  // let count, setCount
  // id += 1
  // 按位与来判断奇偶
  // if (id & 1) {
  //   [count, setCount] = useState(0)
  //   [name, setName] = useState('Mike')
  // } else {
  //   [name, setName] = useState('Mike')
  //   [count, setCount] = useState(0)
  // }
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Mike')
  return (
    <button
      type = 'button'
      onClick={() => {setCount(count+1)}}>
      count{count},name{name}
    </button>
  )
}

export default App2;