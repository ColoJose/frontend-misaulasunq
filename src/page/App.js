import React from 'react';
import './App.css';
import Home from '../component/Home';
import NavbarApp from '../component/Navbar';
import { Route, Router, Switch } from 'react-router-dom';
import Search from '../component/Search';
import history from '../utils/history';
class App extends React.Component {
  
  render() {

    return (
      <div>
        <NavbarApp />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}  />
            <Route exact path="/search" component={Search}  />
          </Switch> 
        </Router>
      </div>
    )
  }
}

export default App;
