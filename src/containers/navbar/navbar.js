import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
        <header className="App-header">
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
      </header>
    )
  }
}

export default Navbar;
