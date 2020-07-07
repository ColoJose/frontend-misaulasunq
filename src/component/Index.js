import React from 'react';
import './Index.css';
import { useAuth0 } from '../react-auth0-spa';
import AdminProfile from './AdminProfile';
import Main from './Main';
import {Button, Container, Row, Col} from 'react-bootstrap';
import history from "../utils/history";
import "./ButtonBranding.css";
import './Index.css';

function Index() {
        
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <div className="container-index">    
            <div id="main" >
                <Container>
                    <Row className="padding">
                        <h1>Bienvenidos a MisaulasUnq</h1>        
                    </Row>
                    <Row className="padding">
                        <Button className="color-button"
                            onClick={ () => history.push('/home')}>Buscar aulas y materias
                        </Button>
                    </Row>
                    <Row className="padding">
                        <h3>Para la administración</h3>
                    </Row>
                    <Row className="padding">
                        <Button className="color-button"
                                onClick={ () => loginWithRedirect()}>Login
                        </Button> 
                    </Row>
                
                
                
                </Container>
                
                
            </div>
        </div>
    )

    // if(isAuthenticated){
    //     return (
    //         <AdminProfile/>
    //     );
    // } else {
    //     return (
    //         <Main/>            
    //     );
    // }
        
}

export default Index;