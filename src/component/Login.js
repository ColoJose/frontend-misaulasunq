import React from 'react';
// Auth0
import { useAuth0 } from '../react-auth0-spa';
// history
import history from "../utils/history";
// Bootstrap
import { Image, Card, Button, Col} from 'react-bootstrap';
// CSS
import './Login.css';
import "./ButtonBranding.css";
// resources
import logo from "../resources/logo-app.png";

function Login() {
        
    const { loginWithRedirect } = useAuth0();

    return (

        <div className="w-100 h-100 container-index d-flex justify-content-center align-items-center">
            <Col xs={11} sm={10} md={5} lg={4} xl={3} className="card-size px-4">
                <Card border="secondary" 
                      className="w-100 h-100">
                    <Card.Title>
                        <Card.Header className="text-center font-weight-bold">
                            ¡Bienvenido/a!
                        </Card.Header>
                    </Card.Title>
                    <Card.Body className="pt-3 px-0 d-flex align-content-between flex-wrap">
                        <Col xs={12} className="d-flex justify-content-center mb-2">
                            <Image src={logo} className="logo"/>
                        </Col>
                        <Col xs={12} className="text-center h5 font-weight-bold font-italic">
                            Mis Aulas UNQ
                        </Col>
                        <Col xs={12} className="text-center text-muted">
                            El sitio para encontrarte en la universidad...
                        </Col>
                        <Col xs={12} className="d-flex justify-content-center mt-1">
                            <Button className="w-50 color-button"
                                onClick={ () => history.push('/home')}>Buscar Materia
                            </Button>
                        </Col>
                    </Card.Body>
                    <Card.Footer className="px-0">
                        <Col className="text-center">
                            <h5>Administradores</h5>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button className="w-50 color-button"
                                    onClick={ () => loginWithRedirect()}>Ingresar
                            </Button> 
                        </Col>
                    </Card.Footer>
                </Card>
            </Col>
        </div>
    )        
}

export default Login;