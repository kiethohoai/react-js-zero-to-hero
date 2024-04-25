import React, { useState } from "react";

const AddUserInfor = (props) => {
  //State
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();

  const handleOnChangeInput = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeAge = (e) => {
    setAge(e.target.value);
  };

  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    props.handleAddNewUsers({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };

  return (
    <div>
      My name's {name} I am {age} I live in
      {address}!
      <form onSubmit={(e) => handleOnSubmitForm(e)}>
        <label>Your name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleOnChangeInput(e)}
        />
      </form>
      <form onSubmit={(e) => handleOnSubmitForm(e)}>
        <label>Your age: </label>
        <input type="text" value={age} onChange={(e) => handleOnChangeAge(e)} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfor;

// class AddUserInfor extends React.Component {
//   //State
//   state = {
//     name: "Kiet",
//     age: 30,
//     address: "Hue City",
//   };

//   handleOnChangeInput = (e) => {
//     this.setState({
//       name: e.target.value,
//     });
//   };

//   handleOnChangeAge = (e) => {
//     this.setState({
//       age: e.target.value,
//     });
//   };

//   handleOnSubmitForm = (e) => {
//     e.preventDefault();
//     // console.log("Check this.state: ", this.state);
//     console.log("this.props", this.props);
//     this.props.handleAddNewUsers({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };

//   render() {}
// }
