import React from "react";
import "./DisplayInfor.scss";

class DispalyInfor extends React.Component {
  //State
  state = {
    isShowHideListUsers: true,
  };

  //Handle
  handleShowHide = () => {
    this.setState({
      isShowHideListUsers: !this.state.isShowHideListUsers,
    });
  };
  render() {
    const { listUsers } = this.props;
    return (
      <div className="display-infor-container">
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
