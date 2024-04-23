//class component
//function component
import React from "react";
class MyComponent extends React.Component {
   //State
   state = {
      name: "David Ho",
      age: 30,
      address: "Hue",
   };

   //Events Handle
   handleClick(e) {
      console.log(e.target);
      // console.log("My name is ", this.state.name);
   }

   handleOnMoveOver(e) {
      console.log(e.target);
   }

   //JSX
   render() {
      return (
         <div>
            My English name's {this.state.name} I am {this.state.age}. and I
            live in {this.state.address} city!
            <br />
            <button onMouseOver={this.handleOnMoveOver}>Hover Me!</button>
            <br />
            <button onClick={this.handleClick}>Click Me!</button>
         </div>
      );
   }
}

export default MyComponent;
