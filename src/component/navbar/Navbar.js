import history from '../../utils/history';
// react
import React, { useState } from 'react';
// bootstrap
import { Nav, Navbar, Form, FormControl, Button, Row, Image } from 'react-bootstrap';
// resoruces
import logoApp from '../../resources/logo-app-white.png';
// css
import './Navbar.css';
import { useAuth0 } from '../../react-auth0-spa';

function NavbarApp() {

    const [subject,setSubject] = useState('');
    const { isAuthenticated, loginWithRedirect, logout, user, loading } = useAuth0();

    const handleSubmit = (e) => {
        history.push("/search");
    }

    const renderLoginOptions = () =>{
        if(loading || !user){
            return <Button variant="link"
                        alt="Login"
                        className="text-white font-navbarBrand separation"
                        onClick={ () => loginWithRedirect({}) }>
                    Login
                </Button>;
        } else {
            return <div className="menu-profile-navbar">
                    <Image className="icon-profile-navbar"
                        src={user.picture}
                        alt="Profile Image"
                        roundedCircle />
                    <Button variant="link"
                            className="text-white font-navbarBrand separation"
                            onClick={ () => logout() }>
                        Logout
                    </Button>
                </div>;
        }
    }

    return (
        <Row>
            <Navbar fixed="top" 
                    className="size-navbar color-navbar"
                    variant="light">
                <Navbar.Brand href="/" className="col-3 justify-content-start">
                    <Image className="logo-navbar" 
                           src={logoApp} 
                           rounded/>
                    <Navbar.Brand className="font-navbarBrand logo-font-navbar">Mis Aulas UNQ</Navbar.Brand>           
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
                    {renderLoginOptions()}
                </Nav>
            </Navbar>
        </Row>
    );
}

export default NavbarApp;

