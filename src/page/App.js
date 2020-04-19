import React/*, { useState, useEffect } */from 'react';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import Home from '../component/Home';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }
  
  render() {

    //const { data } = this.state

    return (
      <Home/>
    )
  }
}

export default App;
