import React, { Component, useEffect, useState, useCallback, useRef } from 'react';
// 返回jsx的hooks
function useCounter(count) {
  const size = useSize()
  return (
    <h1>
      {count}
      size:{size.width}x{size.height}
    </h1>
  )
}
// class Counter extends Component {
//   // 在类组件中使用hooks是非法的，只能在函数组件中使用！！
//   size = useSize()
//   render() {
//     return (
//       <h1>
//         {this.props.count}
//         size:{this.size.width}x{this.size.height}
//       </h1>
//     )
//   }
// }

// 返回count的hooks
function useCount(defaultCount) {
  const it = useRef()

  const [count, setCount] = useState(defaultCount || 0)

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count === 10) {
      clearInterval(it.current)
    }
  })

  return [count, setCount]
}

// useSize的逻辑可以在不同组件复用，而类组件函数的复用则没有这么简单。函数组件可以使用hooks变得像类组件一样有状态。
function useSize() {
  const [ size, setSize ] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  // 这里好像加不加useCallback都一样啊
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  return size
}

function App() {
  const [count, setCount] = useCount(0)

  const Counter = useCounter(count)

  const size = useSize()

  return (
    <div>
      <button
        type = 'button'
        onClick={() => {setCount(count+1)}}>
        count{count}
        size:{size.width}x{size.height}
      </button>
      {/* <Counter count={count}/> */}
      {Counter}
    </div>
  )
}
export default App;