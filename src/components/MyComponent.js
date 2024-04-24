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

  //JSX
  render() {
    return (
      <div>
        <AddUserInfor handleAddNewUsers={this.handleAddNewUsers} />
        <DispalyInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
