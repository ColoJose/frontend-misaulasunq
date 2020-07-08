import React from 'react';
import './App.css';
import NavbarApp from '../component/navbar/Navbar';
import { Route, Router, Switch } from 'react-router-dom';
import AdminProfile from '../component/AdminProfile';
import history from '../utils/history';
import { Container, Row, Col } from 'react-bootstrap';
import NewSubjectForm from '../component/newSubject/NewSubjectForm';
import PrivateRoute from '../component/PrivateRoute';
import EditCommissions from '../component/editSubject/EditCommissions';
import Callback from '../component/Callback';
import Login from "../component/Login";
import Main from '../component/Main';
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
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/callback" render={(props) => <Callback {...props} />} />
                
                <Container className="app-Container">
                    <Row className="app-left-row">
                        <Col xs={12}>
                            <NavbarApp />
                        </Col>
                    </Row>
                    <Row className="app-right-row">
                        <Col xs={12}>
                            <Switch>
                                <Route exact path="/home" render={(props) => <Main {...props} />}/>
                                <PrivateRoute exact path="/admin" render={(props) => <AdminProfile {...props} />}/>
                                <PrivateRoute exact path="/admin/newsubjectform" render={(props) => <NewSubjectForm {...props} />} />
                                <PrivateRoute exact path="/admin/edit-commissions/:idSubject/:subjectName" render={(props) => <EditCommissions {...props} />} />
                            </Switch> 
                        </Col>
                    </Row>
                </Container>
                
            </Switch> 
        </Router>
    )
  }
}

export default App;
