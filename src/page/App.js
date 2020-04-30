import React from 'react';
import './App.css';
import Home from '../component/Home';
import NavbarApp from '../component/Navbar';
import { Route, Router, Switch } from 'react-router-dom';
import Search from '../component/Search';
import history from '../utils/history';
import { Container, Row, Col } from 'react-bootstrap';

class App extends React.Component {
  
  render() {

    return (
      <Container  style={{height:"inherit", maxWidth: "98%"}}>
        <Row style={{height:"13%"}}>
          <Col xs={12}>
          <NavbarApp />
          </Col>
        </Row>
        <Row style={{height:"87%"}}> {/*className="margin-top">*/}
        <Router history={history}>
          <Switch>
            {/* <Route exact path="/" component={Home}  /> */}
            <Route exact path="/" component={Search}  />
          </Switch> 
        </Router>
        </Row>
      </Container>
    )
  }
}

export default App;
