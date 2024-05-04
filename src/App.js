import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponent";
import React from "react";

//Class Component
class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        Hello ReactJS
        <MyComponent></MyComponent>
      </div>
    );
  }
}

export default App;