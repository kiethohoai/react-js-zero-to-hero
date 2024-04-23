//class component
//function component
import React from "react";
import UserInfor from "./UserInfor";
import DispalyInfor from "./DisplayInfor";
class MyComponent extends React.Component {
   //JSX
   render() {
      const myInfor = ["a", "b", "c"];
      return (
         <div>
            <UserInfor />
            <DispalyInfor name="HO HOAI KIET" age={30} />
            <DispalyInfor name="HO HOAI TUNG" age={28} myInfor={myInfor} />
         </div>
      );
   }
}

export default MyComponent;
