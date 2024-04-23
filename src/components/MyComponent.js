//class component
//function component
import React from "react";
import UserInfor from "./UserInfor";
import DispalyInfor from "./DisplayInfor";
class MyComponent extends React.Component {
   state = {
      listUsers: [
         { id: 1, name: "Ho Hoai Kiet", age: 30 },
         { id: 2, name: "Ho Hoai Tung", age: 28 },
         { id: 3, name: "Ho Hoai San", age: 26 },
      ],
   };
   //JSX
   render() {
      return (
         <div>
            <UserInfor />
            <DispalyInfor listUsers={this.state.listUsers} />
         </div>
      );
   }
}

export default MyComponent;
