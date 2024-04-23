//class component
//function component
import React from "react";
class MyComponent extends React.Component {
   //State
   state = {
      name: "David Ho",
      age: 30,
      address: "Hue City",
   };

   //Events Handle
    handleOnChangeInput = (e) => {
      this.setState({
         name: e.target.value
      })
   }

   handleOnSubmit = (e) => {
      e.preventDefault()
      console.log(this.state);
   }

   //JSX
   render() {
      return (
         <div>
            My name's {this.state.name} I am {this.state.age}. and I
            live in {this.state.address}!
            <form onSubmit={(e) => this.handleOnSubmit(e)}>
               <input
                  type="text"
                  onChange={(e) => this.handleOnChangeInput(e)}
               />
               <button>Submit</button>
            </form>
         </div>
      );
   }
}

export default MyComponent;
