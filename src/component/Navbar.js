import history from '../utils/history';
// react
import React, { useState } from 'react';
// bootstrap
import { Nav, Navbar, Form, FormControl, Button, Row, Image } from 'react-bootstrap';
// resoruces
import logoApp from '../resources/logo-app.png';
// css
import './Navbar.css';

import { useAuth0 } from '../react-auth0-spa';

function NavbarApp() {

    const [subject,setSubject] = useState('');
    const { isAuthenticated, loginWithRedirect, logout, user, loading } = useAuth0();

    const handleSubmit = (e) => {
        history.push("/search");
        console.log(subject);
    }

    const style = {
        width: "50px",
        borderRadius: "50px"
    }

    return (
        <Row>
            <Navbar fixed="top" 
                    className="size-navbar color-navbar"
                    variant="light">
                <Navbar.Brand className="col-3 justify-content-start">
                    <Image style={{width:"15%"}} src={logoApp} 
                           rounded/>
                    <Navbar.Brand className="font-navbarBrand">Mis Aulas UNQ</Navbar.Brand>           
                </Navbar.Brand>

                <Form inline 
                      className="col-6 justify-content-center" 
                      onSubmit={handleSubmit}>
                    <FormControl type="text" 
                                 placeholder="Ingrese lo que busca" 
                                 className="mr-sm-2"
                                 value={subject}
                                 onChange={ (e) =>  setSubject(e.target.value)}
                                 disabled 
                                 hidden/>
                    <Button type="submit" 
                            variant="light" 
                            disabled 
                            hidden>
                        Search
                    </Button>
                </Form>

                <Nav  className="col-3 justify-content-end">

                    {   (loading || !user) ?
                                        <Navbar.Text onClick={ () => loginWithRedirect({}) }>Login</Navbar.Text>
                                           :
                                        <div>
                                           <Navbar.Text><img style={style}
                                                             src={user.picture}
                                                             alt="profile"
                                                             >
                                                         </img></Navbar.Text>
                                            <Navbar.Text  onClick={ () => logout() }>Logout</Navbar.Text>
                                       </div>     
                    }
                    
                    
                    
                    
                </Nav>
            </Navbar>
        </Row>
    );
}

export default NavbarApp;

