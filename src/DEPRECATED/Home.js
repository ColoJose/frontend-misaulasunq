import React from 'react';
import './Home.css';
import { useAuth0 } from '../react-auth0-spa';
import AdminProfile from '../component/AdminProfile';
import Main from '../component/Main';

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