import React from 'react';
import './App.css';
import NavbarApp from '../component/Navbar';
import { Route, Router, Switch } from 'react-router-dom';
import Home from '../component/Home';
import AdminProfile from '../component/AdminProfile';
import history from '../utils/history';
import { Container, Row, Col } from 'react-bootstrap';
import NewSubjectForm from '../component/newSubject/NewSubjectForm';

class App extends React.Component {
  
  render() {

    return (
        <Container className="app-Container">
            <Row className="app-left-row">
                <Col xs={12}>
                    <NavbarApp />
                </Col>
            </Row>
            <Row className="app-right-row">
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home}  />
                        <Route exact path="/admin" component={AdminProfile} />
                        <Route exact path="/admin/newsubjectform" component={NewSubjectForm} />
                    </Switch> 
                </Router>
            </Row>
        </Container>
    )
  }
}

export default App;
