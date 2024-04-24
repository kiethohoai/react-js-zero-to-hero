import React from "react";

class DispalyInfor extends React.Component {
  // State
  state = {
    isShowListUsers: true,
  };

  // Handler
  handleShowHide = () => {
    this.setState({
      isShowListUsers: !this.state.isShowListUsers,
    });
  };

  // Render
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowListUsers == true ? "Hide List Users:" : "Show List Users:"}
          </span>
        </div>

        {this.state.isShowListUsers && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <hr></hr>
                  <div>My name's {user.name}</div>
                  <div>I'm years {user.age} old!</div>
                  <hr></hr>
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
