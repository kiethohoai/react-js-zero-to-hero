import React from "react";

class DispalyInfor extends React.Component {
   render() {
      //   destructuring props
      const { listUsers } = this.props; // const listUsers = this.props.listUsers
      return (
         <div>
            {listUsers.map(user => {
               return (
                  <div key={user.id}>
                     <div>My name's {user.name}</div>
                     <div>I'm years {user.age} old!</div>
                  </div>
               );
            })}

            {/* <div>My name's {name}</div>
            <div>I'm {age} years old!</div>
            <hr />
            <div>My name's {name}</div>
            <div>I'm {age} years old!</div>
            <hr />
            <div>My name's {name}</div>
            <div>I'm {age} years old!</div> */}
            {/* <div>My name's {this.props.name}</div>
            <div>I'm {this.props.age} years old!</div> */}
         </div>
      );
   }
}

export default DispalyInfor;
