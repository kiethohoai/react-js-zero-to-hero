import React from "react";

class DispalyInfor extends React.Component {
   render() {
      console.log(this.props);
      //   destructuring props
      let { name, age } = this.props; //object
      return (
         <div>
            DISPALY INFORMATION
            <div>My name's {name}</div>
            <div>I'm {age} years old!</div>
            {/* <div>My name's {this.props.name}</div>
            <div>I'm {this.props.age} years old!</div> */}
         </div>
      );
   }
}

export default DispalyInfor;
