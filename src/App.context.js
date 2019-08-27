import React, {createContext, Component} from 'react';
const OnlineContext = createContext()
const BatteryContext = createContext()
class Leaf extends Component {
  static contextType = BatteryContext
  render() {
    const val = this.context
    return (
          <h1> val:{val} </h1>
      // <BatteryContext.Consumer>
      //   {
      //     val1 => (
      //       <OnlineContext.Consumer>
      //         {
      //           val => 
      //             <div>
      //               <h1>num: {val1}</h1>
      //               <h2>num+11: {val}</h2>
      //             </div>
      //         }
      //       </OnlineContext.Consumer>
      //     )
      //   }
      // </BatteryContext.Consumer>
    )
  }
}
class Middle extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log(1)
  }
  componentDidUpdate() {
    console.log(2)
  }
  render() {
    return <Leaf></Leaf>
  }
}
class App extends Component {
  state = {
    num : 98
  }
  render() {
    return (
      <div>
        <button onClick={()=>{this.setState({num: this.state.num+1})}}></button>
        <BatteryContext.Provider value={this.state.num}>
          <OnlineContext.Provider value = {this.state.num + 11}>
            <Middle/>
          </OnlineContext.Provider>
        </BatteryContext.Provider>
      </div>
    );
  }
}

export default App;
