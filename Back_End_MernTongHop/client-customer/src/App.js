import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...'
    };
  }

  componentDidMount() {
    axios.get('/hello')
      .then((res) => {
        this.setState({ message: res.data.message });
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }

  render() {
    return (
      <div>
        <h2>Customer page</h2>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
