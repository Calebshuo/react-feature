import React, { useEffect, PureComponent, useState, useCallback, useRef } from 'react';

// 函数组件拿不到实例，因为在react中只有类组件才能实例化（函数组件的实例被封装到内部类中开发者不能访问），由此可以看出函数组件不能百分百代替类组件。
// const Counter = memo(function Foo(props) {
//   console.log('counter render')
//   return(
//     <div onClick={props.onClick}>count: {props.count}</div>
//   )
// })
class Counter extends PureComponent {
  speak() {
    console.log(`counter count is ${this.props.count}`)
  }
  render() {
    return(
          <div onClick={this.props.onClick}>count: {this.props.count}</div>
        )
  }
}
function App() {
  // let it
  // 2: 同步不同渲染周期一些需要共享的数据：使用useRef保证变量在函数重新执行后（组件重新渲染后）变量不变（还是之前那个变量）。类似类的属性成员
  const it = useRef()
  const counterRef = useRef()

  const [count, setCount] = useState(0)

  const onClick = useCallback(() => {
    console.log('click')

    // 1:最常见使用场景
    counterRef.current.speak()
  }, [counterRef])

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    // 这样做不行，因为每次App re-render都会重新定义it
    // if (count === 10) {
    //   clearInterval(it)
    // }
    // 使用current属性就可以了
    if (count === 10) {
      clearInterval(it.current)
    }
  })

  return (
    <div>
      <button
        type = 'button'
        onClick={() => {setCount(count+1)}}>
        count{count}
      </button>
      <Counter ref={counterRef} count={count} onClick={onClick}/>
    </div>
  )
}

export default App;