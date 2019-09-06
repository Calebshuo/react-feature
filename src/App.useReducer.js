import React, { useReducer, useRef, useContext } from 'react';
// function App() {
//   const [sum, dispatch] = useReducer((state, action) => {
//     return state + action;
//   }, 0);
//   return (
//     <>
//       {sum}

//       <button onClick={() => dispatch(1)}>
//         Add 1
//       </button>
//       <ShoppingList/>
//     </>
//   );
// }


// demo1
function ShoppingList() {
  // 获取input输入框的dom实例
  const inputRef = useRef();
  // 定义useReducer
  const [items, dispatchShop] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            id: state.length,
            name: action.name
          }
        ];
      case 'remove':
        return state.filter((_, index) => index != action.index);
      default:
        return state;
    }
  }, []);
  // 调用dispatch并传入action
  function handleSubmit(e) {
    e.preventDefault();
    dispatchShop({
      type: 'add',
      name: inputRef.current.value
    });
    inputRef.current.value = '';
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name}
            <button
              onClick={() => dispatchShop({ type: 'remove', index })}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

// demo2
// 定义初始化值
const initState = {
  name: '',
  pwd: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
}
// 定义state[业务]处理逻辑 reducer函数
function loginReducer(state, action) {
  switch(action.type) {
      case 'login':
          return {
              ...state,
              isLoading: true,
              error: '',
          }
      case 'error':
          return {
              ...state,
              error: action.payload.error,
              name: '',
              pwd: '',
              isLoading: false,
          }
      default: 
          return state;
  }
}

// 定义 context函数
const LoginContext = React.createContext();

function App() {
    const [state, dispatch] = useReducer(loginReducer, initState);
    const login = (event) => {
        dispatch({ type: 'login' });
    }
    console.log(state)
    // 利用 context 共享dispatch
    return ( 
        <LoginContext.Provider value={dispatch}>
            <h2>{state.error}</h2>
            <button onClick={() => login()}>login</button>
            <LoginButton />
        </LoginContext.Provider>
    )
}
function LoginButton() {
    // 子组件中直接通过context拿到dispatch，触发reducer操作state
    const dispatch = useContext(LoginContext);
    const click = () => {
            dispatch({
                type: 'error',
                payload: { error: 'error' }
            });
    }
    return (
      <button onClick={() => click()}>error</button>
    )
}


export default App