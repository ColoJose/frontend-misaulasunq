import React from 'react';
import './App.css';
import NavbarApp from '../component/Navbar';
import { Route, Router, Switch } from 'react-router-dom';
import Home from '../component/Home';
import AdminProfile from '../component/AdminProfile';
import history from '../utils/history';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  
  render() {

    return (
      <Container>
        <Row>
          <Col xs={12}>
          <NavbarApp />
          </Col>
        </Row>
        <Row className="margin-top">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}  />
          </Switch> 
        </Router>
        </Row>
      </Container>
    )
  }
}

export default App;
