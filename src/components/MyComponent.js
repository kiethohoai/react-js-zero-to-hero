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
       console.log("My name is ", this.state.name);
       console.log("I am ", this.state.age);

      this.setState({
         name: "Ho Hoai Kiet",
         age: Math.floor((Math.random() * 100) + 1)
      })
    }

   handleOnMoveOver(e) {
      // console.log(e.target);
   }

   //JSX
   render() {
      return (
         <div>
            My English name's {this.state.name} I am {this.state.age}. and I
            live in {this.state.address} city!
            <br />
            <button onClick={(e) => {this.handleClick(e);}}>Click Me!</button>
            <br />
            <button onMouseOver={this.handleOnMoveOver}>Hover Me!</button>
         </div>
      );
   }
}

export default MyComponent;
