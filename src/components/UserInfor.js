import React from "react";

class UserInfor extends React.Component {
   //State
   state = {
      name: "David Ho",
      age: 30,
      address: "Hue City",
   };

   handleOnChangeInput = e => {
      console.log("🚀 ~ e:", e.target.value);
      this.setState({
         name: e.target.value,
      });
   };

   handleOnChangeAge = e => {
      this.setState({
         age: e.target.value,
      });
   };

   handleOnSubmitForm = e => {
      console.log(this.state);
      e.preventDefault();
   };

   render() {
      return (
         <div>
            My name's {this.state.name} I am {this.state.age} I live in{" "}
            {this.state.address}!
            <form onSubmit={e => this.handleOnSubmitForm(e)}>
               <label>Your name: </label>
               <input
                  type="text"
                  value={this.state.name}
                  onChange={e => this.handleOnChangeInput(e)}
               />
               <button>Submit</button>
            </form>
            <form onSubmit={e => this.handleOnSubmitForm(e)}>
               <label>Your age: </label>
               <input
                  type="text"
                  value={this.state.age}
                  onChange={e => this.handleOnChangeAge(e)}
               />
               <button>Submit</button>
            </form>
         </div>
      );
   }
}

export default UserInfor;
