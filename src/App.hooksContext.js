import React, { Component, useState, createContext, useContext } from 'react';

const countContext = createContext()

function Foo() {
  const count = useContext(countContext)
  return(
    <div>count: {count}</div>
    // <countContext.Consumer>
    //   {
    //     count => (
    //       <div>count: {count}</div>
    //     )
    //   }
    // </countContext.Consumer>
  )
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button
        type = 'button'
        onClick={() => {setCount(count+1)}}>
        count{count}
      </button>
      <countContext.Provider value={count}>
        <Foo/>
      </countContext.Provider>
    </div>
  )
}

export default App;