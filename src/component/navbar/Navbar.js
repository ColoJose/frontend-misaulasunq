import history from '../../utils/history';
// react
import React, { useState, useEffect } from 'react';
// bootstrap
import { Nav, Navbar, Form, FormControl, Button, Row, Image } from 'react-bootstrap';
// resources
import logoApp from '../../resources/logo-app-white.png';
// css
import './Navbar.css';
import { useAuth0 } from '../../react-auth0-spa';
// Semantic UI
import { Dropdown } from 'semantic-ui-react';

function NavbarApp() {

    const { isAuthenticated, logout, user, loading } = useAuth0();
    const [renderHomeButton,setRenderHomeButton] = useState(false);

    const isInAdminPages = () =>{
        return (window.location.href.includes("/admin") 
                && window.location.href.endsWith("/admin"))  
            || (window.location.search.includes("admin") 
                && window.location.search.endsWith("/admin"));
    }

    useEffect (() => { 
        if(isInAdminPages()){
            setRenderHomeButton(true);
        }
      },[]);

    const goToAdmin = () => {
        setRenderHomeButton(true);
        history.push("/admin");
    }

    const goToHome = () => {
        setRenderHomeButton(false);
        history.push("/home");
    }

    const renderHomeAdminOption = () => {
        if(renderHomeButton){
            return <Dropdown.Item text='Ir al Home'
                                  style={{fontFamily:"Arial"}}
                                  onClick={ () => goToHome() }/>;
        } else{
            return <Dropdown.Item text='Panel de Administración'
                                  style={{}}
                                  className="fonts-navbar"
                                  onClick={ () => goToAdmin() }/>;
        };
    }

    const renderLoginOptions = () =>{
        if(!loading && user && isAuthenticated){
            return(
                <div >
                    <Image className="d-md-inline d-none d-sm-none icon-profile-navbar"
                           src={user.picture}
                           alt="Profile Image"
                           roundedCircle />
                    <Dropdown icon='cog'
                              floating
                              button
                              className='icon branding-semantic-dropdown ml-2'
                              direction='left'>
                        <Dropdown.Menu>                            
                            {renderHomeAdminOption()}
                            <Dropdown.Divider />
                            <Dropdown.Item text='Salir' 
                                           className="fonts-navbar"
                                           onClick={ () => logout() }/>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>);
        }
    }

    return (
        <Row>
            <Navbar fixed="top" 
                    className="size-navbar color-navbar pr-1 pr-xl-1"
                    variant="light">
                <Navbar.Brand href="/home" className="col-3 justify-content-start">
                    <Image className="logo-navbar" 
                           src={logoApp} 
                           rounded/>
                    <Navbar.Brand className="ml-2 font-navbarBrand logo-font-navbar">Mis Aulas UNQ</Navbar.Brand>           
                </Navbar.Brand>

                <Form inline 
                      className="col-6 justify-content-center"
                      hidden>
                    <FormControl type="text" 
                                 placeholder="Ingrese lo que busca" 
                                 className="mr-sm-2"
                                 disabled 
                                 hidden/>
                    <Button type="submit" 
                            variant="light" 
                            disabled>
                        Search
                    </Button>
                </Form>

                <Nav  className="pr-1 pr-xl-1 ml-auto col-3 d-flex justify-content-end">
                    {renderLoginOptions()}
                </Nav>
            </Navbar>
        </Row>
    );
}

export default NavbarApp;