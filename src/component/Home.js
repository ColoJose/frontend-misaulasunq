import React from 'react';
import './Home.css';
import { useAuth0 } from '../react-auth0-spa';
import AdminProfile from './AdminProfile';
import Main from './Main';
import {Button} from 'react-bootstrap';
import history from "../utils/history";
import "./ButtonBranding.css";

function Home() {
        
    const { isAuthenticated } = useAuth0();

    if(isAuthenticated){
        return (
            <AdminProfile/>
        );
    } else {
        return (
            <Main/>            
        );
    }
        
}

export default Home;