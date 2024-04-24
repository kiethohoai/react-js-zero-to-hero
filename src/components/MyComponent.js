//class component
//function component
import React from "react";
import AddUserInfor from "./AddUserInfor";
import DispalyInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Ho Hoai Kiet", age: 16 },
      { id: 2, name: "Ho Hoai Tung", age: 28 },
      { id: 3, name: "Ho Hoai San", age: 26 },
    ],
  };

  handleAddNewUsers = (newObj) => {
    console.log("🚀 ~ newObj:", newObj);
    this.setState({
      listUsers: [newObj, ...this.state.listUsers],
    });
  };

  handleDeleteUser = (userId) => {
    let listUsersNew = this.state.listUsers;
    // let listUsersNew = [...this.state.listUsers];
    listUsersNew = listUsersNew.filter((item) => {
      return item.id !== userId;
    });

    this.setState({
      listUsers: listUsersNew,
    });
  };

  //JSX
  render() {
    return (
      <>
        <div className="a">
          <AddUserInfor handleAddNewUsers={this.handleAddNewUsers} />
          <DispalyInfor
            listUsers={this.state.listUsers}
            handleDeleteUser={this.handleDeleteUser}
          />
        </div>

        <div className="b"></div>
      </>
    );
  }
}

export default MyComponent;
