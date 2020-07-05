import React from 'react';
import './App.css';
import NavbarApp from '../component/Navbar';
import { Route, Router, Switch } from 'react-router-dom';
import Home from '../component/Home';
import AdminProfile from '../component/AdminProfile';
import history from '../utils/history';
import { Container, Row, Col } from 'react-bootstrap';
import NewSubjectForm from '../component/newSubject/NewSubjectForm';
import PrivateRoute from '../component/PrivateRoute';
import EditCommissions from '../component/editSubject/EditCommissions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    autoClose: 3300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
});

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
                        <Route exact path="/admin" render={(props) => <AdminProfile {...props} />} />
                        <Route exact path="/admin/newsubjectform" render={(props) => <NewSubjectForm {...props} />} />
                        <Route exact path="/admin/edit-commissions/:idSubject/:subjectName" render={(props) => <EditCommissions {...props} />} />
                    </Switch> 
                </Router>
            </Row>
        </Container>
    )
  }
}

export default App;
