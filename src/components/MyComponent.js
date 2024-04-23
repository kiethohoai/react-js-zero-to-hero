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

   //JSX
   render() {
      return (
         <div>
            My English name's {this.state.name} I am {this.state.age}. and I
            live in {this.state.address} city!
         </div>
      );
   }
}

export default MyComponent;
