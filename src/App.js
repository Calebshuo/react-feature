import React, { useState } from 'react';
// let id = 0
function App() {
  // let name, setName
  // let count, setCount
  // id += 1
  // 按位与来判断奇偶
  // if (id & 1) {
    let [count, setCount] = useState(0)
    let [name, setName] = useState('Mike')
  // } else {
  //   [name, setName] = useState('Mike')
  //   [count, setCount] = useState(0)
  // }
  return (
    <button
      type = 'button'
      onClick={() => {setCount(count+1)}}>
      count{count},name{name}
    </button>
  )
}
export default App;