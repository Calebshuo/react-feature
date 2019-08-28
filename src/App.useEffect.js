import React, { Component, useState, useEffect } from 'react';

// useEffect三个种需求的解决方式，一是文档的title绑定到count的值上，用来代替componentDidMount、componentDidUpdate两个生命周期钩子。二是绑定事件和解绑事件（其中解绑事件利用useEffect的return后面的回调函数），用来代替componentDidMount、componentWillUnmount钩子。三是useEffect的第二个参数：一个数组，只有当数组中的所有元素都不变时useEffect才不会每次重渲染都执行（只执行第一次组件挂载和最后一次组件卸载）。场景：绑定事件的元素不会被频繁替换，比如window。
class App extends Component {
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

function App2() {
  // Demo1: 绑定、解绑demo
  const [ size, setSize ] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  // hooks两点优势：提高代码复用，优化关注点分离。
  // resize的逻辑和count的逻辑完全分离，互不干扰，这就是关注点分离。
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    // 回调函数在视图被销毁的时候触发：有两种销毁的原因：1、重渲染。2、组件卸载。(加了空数组参数后，绑定函数只会运行在组件加载时，回调函数只会运行在组件卸载后。所以console1就不会执行了)
    // 只有数组中每一项都不变时useEffect才不会执行。如果不传数组那useEffect每次都会执行，比如第一个count的例子。如果只传空数组，空数组每项是相同的，所以useEffect只会在第一次和最后一次（组件卸载）执行。
    return () => {
      // console.log(1)
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  // Demo2: 两个生命周期demo
  const [count, setCount] = useState(0)
  // 代码更加简洁，不关心是componentDidMount还是componentDidUpdate生命周期
  useEffect(() => {
    document.title = count
  })
  // Demo3: useEffect第二个参数的demo
  // count每次都改变，数组中的元素每次都变，所以useEffect每次都会执行。
  useEffect(() => {
    console.log('count:',count)
  }, [count])

  let click = () => {
    console.log('click')
  }
  // 如果元素被替换的话，事件绑定就失效了，所以需要每次渲染都先绑定，组件更新前解绑组件更新后再绑定。
  useEffect(() => {
    document.querySelector('#size').addEventListener('click',click)
    return () => {
      document.querySelector('#size').removeEventListener('click',click)
    }
  })
  // Demo4 测试第二个参数:
  // 1、数组中的元素为对象的话,只要调用usestate返回的第二个参数去修改了对象的属性，那么useEffect就会再次触发。（个人理解应该是调用usestate改对象后，对象的地址就改变了，就不是原本的对象了，因为usestate返回的第二个参数是返回一个新的对象。而值比较的话（如果对象值相等）则不会触发useEffect再次执行）
  // 2、如果不使用usestate来改变值的话，useEffect是检测不到的
  let [demo,setDemo] = useState({
    b:1
  })
  useEffect(() => {
    console.log('测试第二个参数')
  }, [demo])
  // let a = {
  //   b:1
  // }
  // useEffect(() => {
  //   console.log('测试第二个参数')
  // }, [a.b])
  return (
    <div>
      <button
        onClick={() => {setCount(count+1)}}>
        count{count}
      </button>
      {count % 2
      ? <p id='size'>sizep:{size.width}x{size.height}</p>
      : <span id='size'>sizespan:{size.width}x{size.height}</span>}
      <button
        onClick={() => {
          setDemo({
            b:1
          })
          console.log(demo.b)
        }}>
        Demo4测试
      </button>
      {/* <button
        onClick={() => {
          a.b++
          console.log(a.b)
        }}>
        Demo4测试
      </button> */}
    </div>
  )
}

export default App2;