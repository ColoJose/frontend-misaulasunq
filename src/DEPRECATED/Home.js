import React from 'react';
import './Home.css';
import { useAuth0 } from '../react-auth0-spa';
import AdminProfile from '../component/AdminProfile';
import Main from '../component/Main';
import {Button} from 'react-bootstrap';
import history from "../utils/history";
import "../component/ButtonBranding.css";

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