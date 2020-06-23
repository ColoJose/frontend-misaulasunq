import history from '../utils/history';
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Form, FormControl, Button, Row, Image } from 'react-bootstrap';
import logoApp from '../resources/logo-app-white.png';
import './Navbar.css';
import { useAuth0 } from '../react-auth0-spa';
import SubjectAPI from '../Api/SubjectAPI';
import AuthorizeJWT from '../Api/AuthorizeJWT';

function NavbarApp() {

    const { isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims } = useAuth0();
    const subjectApi = new SubjectAPI();

    const handleSubmit = (e) => {
        history.push("/search");
    }

    // useEffect(() => {
    //     console.log(isAuthenticated);
    //     isAuthenticated && localStorage.setItem("username",user.name);
    //     isAuthenticated && localStorage.setItem("foo","foo");    
    // }, []);

    const setUserNameLocalStorage = () => { 
        localStorage.setItem("username",user.name);
        localStorage.setItem("isAuthenticated",true);
    }

    // const getJWT = () => {
    //     console.log("entro al getJWT");
    //     subjectApi.getJWT().then( (resp) => {
    //         console.log(resp.data)
    //     }).catch( (e) => console.log("paso x aca"));
    // }

    // async function loginWithRedirectAsync(){
    //    await loginWithRedirect();
    // }

    const login = () => {
            // loginWithRedirectAsync().then( (resp) => {
            //     if( true ) {
            //         setUserNameLocalStorage();
            //         console.log("desp set storage")
            //         getJWT();
            //         console.log("desp jwt");
            //     }
            // })
            if( isAuthenticated ) {
                setUserNameLocalStorage();
            }
    }

    const logoutAux = () => {
        localStorage.clear();
        logout();
    }

    return (
        <Row>
            <Navbar fixed="top" 
                    className="size-navbar color-navbar"
                    variant="light">
                <Navbar.Brand className="col-3 justify-content-start">
                    <Image className="logo-navbar" src={logoApp} 
                           rounded/>
                    <Navbar.Brand className="font-navbarBrand logo-font-navbar">Mis Aulas UNQ</Navbar.Brand>           
                </Navbar.Brand>

                <Form inline 
                      className="col-6 justify-content-center" 
                      onSubmit={handleSubmit}>
                    <Button type="submit" 
                            variant="light" 
                            disabled 
                            hidden>
                        Search
                    </Button>
                </Form>

                <Nav  className="col-3 justify-content-end">

                    {   localStorage.getItem("isAuthenticated") === "true" ?
                                        <div className="menu-profile-navbar">
                                            <Navbar.Text id="username">
                                                {/* <p>{localStorage.getItem("username")}</p> */}
                                                <p className="font-navbarBrand">
                                                   Hola,&nbsp;{ localStorage.getItem("username") }
                                                </p>
                                            </Navbar.Text>
                                            <Navbar.Text id="bar" className="font-navbarBrand">|</Navbar.Text>
                                            <Navbar.Text onClick={ () => logoutAux() }
                                                         className="font-navbarBrand separation">
                                                            Logout
                                            </Navbar.Text>
                                        </div>

                                            :
                                        <Navbar.Text onClick={ () => login()} 
                                                     className="font-navbarBrand menu-profile-navbar">
                                                        Login
                                        </Navbar.Text>
                                           
                                             
                    }
                    
                    
                    
                    
                </Nav>
            </Navbar>
        </Row>
    );
}

export default NavbarApp;

