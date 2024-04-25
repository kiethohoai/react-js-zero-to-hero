import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "../logo.svg";

// class DispalyInfor extends React.Component {
//   render() {
//     const { listUsers } = this.props;
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <div>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                   <hr />
//                   <div>My name is {user.name}</div>
//                   <div>And I am {user.age} years old.</div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DispalyInfor = (props) => {
  const { listUsers } = props;
  const [isShowHideListUsers, setShowHideListUsers] = useState(true);

  const handleShowHideListUsers = () => {
    setShowHideListUsers(!isShowHideListUsers);
  };

  return (
    <div className="display-infor-container">
      <div>
        <hr />
        <span onClick={() => handleShowHideListUsers()}>
          {isShowHideListUsers === true
            ? "Hide List Users:"
            : "Show List Users:"}
        </span>
      </div>

      {isShowHideListUsers && (
        <div>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                <hr />
                <div>My name is {user.name}</div>
                <div>And I am {user.age} years old.</div>
                <div>
                  <button onClick={() => props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DispalyInfor;
