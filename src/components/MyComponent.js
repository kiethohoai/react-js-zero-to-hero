//class component
//function component
import React from "react";
class MyComponent extends React.Component {
   //JSX
   render() {
      return (
         <div>
            My fist component! <br />
            {Math.random()}
         </div>
      );
   }
}

export default MyComponent;
