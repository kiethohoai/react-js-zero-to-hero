import React from "react";
import "./DisplayInfor.scss";
import logo from "../logo.svg";

class DispalyInfor extends React.Component {
  constructor(props) {
    console.log("Call Constructor #1");
    super(props);
    this.state = {
      isShowHideListUsers: true,
    };
  }

  //Handle
  handleShowHide = () => {
    this.setState({
      isShowHideListUsers: !this.state.isShowHideListUsers,
    });
  };

  componentDidMount() {
    console.log("Call me component did mount #3");
    setTimeout(() => {
      document.title = "Did mount";
      console.log("Change Title of Webspage #4");
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Call me componentDidUpdate #5");
    console.log("🚀 ~ this.props:", this.props);
    console.log("🚀 ~ prevState:", prevState);
    console.log("🚀 ~ prevProps:", prevProps);
  }

  render() {
    console.log("Call me render #2 ");
    const { listUsers } = this.props;
    return (
      <div className="display-infor-container">
        {/* <img src={logo} alt="no-image" /> */}
        <div>
          <hr />
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowHideListUsers == true
              ? " HIDE List Users:"
              : "SHOW List Users:"}
          </span>
        </div>

        {this.state.isShowHideListUsers && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <hr />
                  <div>My name is {user.name}</div>
                  <div>And I am {user.age} years old.</div>
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(user.id)}
                    >
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
  }
}

export default DispalyInfor;
