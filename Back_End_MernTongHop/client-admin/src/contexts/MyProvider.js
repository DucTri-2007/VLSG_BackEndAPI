import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: ''
    };
  }

  setToken = (token) => {
    this.setState({ token: token });
  };

  setUsername = (username) => {
    this.setState({ username: username });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          token: this.state.token,
          username: this.state.username,
          setToken: this.setToken,
          setUsername: this.setUsername
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
