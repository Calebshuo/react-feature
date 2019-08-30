import React, { Component, useState, useMemo, memo, useCallback } from 'react';

const Counter = memo(function Foo(props) {
  console.log('counter render')
  return(
    <div onClick={props.onClick}>count: {props.count}</div>
  )
})

function App() {
  console.log(11)
  const [count, setCount] = useState(0)

  // 语法和useEffect一致，如果不传每次都执行那useMemo的意义就不存在了，如果传入空数组，那么只运行一次，策略和useEffect是一样的，但是调用时机不同，useEffect执行副作用，所以一定是在渲染后执行的，而useMemo提供一个返回值的，返回值可以直接参与渲染，所以useMemo是在渲染期间完成的,两者有这样的一前一后的区别。
  // 数组中元素都不变时不会执行，下面demo，double会变成6然后变成8之后就一直不变了。
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  // 给子组件传入onClick函数，由于每次更改count值整个App函数会重新执行，所以onClick函数每次都不一样（函数地址不同），所以导致子组件的memo函数不起作用。
  // const onClick = () => {
  //   console.log('click')
  // }
  // 解决方式：使用useMemo并且第二个参数传入空数组,使每次返回的函数地址不变
  // const onClick = useMemo(() => {
  //   return () => {
  //   console.log('click')
  //   }
  // },[])
  // 如果useMemo第一个函数中返回的是函数，则可以使用useCallback来简化，如下。注意仅仅是简写而已。
  // const onClick = useCallback(() => {
  //   console.log('click')
  // },[])

  // 声明一个useCallback的依赖，其中react能保证每次re-render后setclickCount保持不变（参见官网截图），所以不需要把setclickCount这个句柄放入数组的第二个参数里。
  // 再次改造：即使不依赖clickCount句柄，仍能使clickCount每次都加1
  const [clickCount, setclickCount] = useState(0)
  const onClick = useCallback(() => {
    console.log('click')
    setclickCount((clickCount) => clickCount + 1)
    // setclickCount(clickCount + 1)
  }, [])
  // },[clickCount])
  // },[clickCount, setclickCount])
  return (
    <div>
      <button
        type = 'button'
        onClick={() => {setCount(count+1)}}>
        count{count}
        double{double}
      </button>
      <Counter count={double} onClick={onClick}/>
    </div>
  )
}

export default App;