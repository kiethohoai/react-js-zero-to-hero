import React from "react";

class AddUserInfor extends React.Component {
  //State
  state = {
    name: "Kiet",
    age: 30,
    address: "Hue City",
  };

  handleOnChangeInput = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleOnChangeAge = (e) => {
    this.setState({
      age: e.target.value,
    });
  };

  handleOnSubmitForm = (e) => {
    e.preventDefault();
    // console.log("Check this.state: ", this.state);
    console.log("this.props", this.props);
    this.props.handleAddNewUsers({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  };

  render() {
    return (
      <div>
        My name's {this.state.name} I am {this.state.age} I live in{" "}
        {this.state.address}!
        <form onSubmit={(e) => this.handleOnSubmitForm(e)}>
          <label>Your name: </label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.handleOnChangeInput(e)}
          />
        </form>
        <form onSubmit={(e) => this.handleOnSubmitForm(e)}>
          <label>Your age: </label>
          <input
            type="text"
            value={this.state.age}
            onChange={(e) => this.handleOnChangeAge(e)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfor;
