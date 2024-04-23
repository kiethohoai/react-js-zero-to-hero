import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponent";
import React from "react";

//Class Component
class App extends React.Component {
   render() {
      return (
         <div>
            Hello ReactJS (App)
            <MyComponent></MyComponent>
         </div>
      );
   }
}

export default App;

///////////////////////////// BACKUP APP AROW FUNC /////////////////////////////////////
//Function Component
// const App = () => {
//    const count = useSelector(state => state.counter.count);
//    const dispatch = useDispatch();
//    return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Hi, this is my first react project!
//           </p>
//           <div>Count = {count}</div>
//           <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//           <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//         </header>
//       </div>
//    );
// };
