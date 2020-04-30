import React, { useState } from 'react';
import './Home.css';
import { useAuth0} from '../react-auth0-spa';
import AdminProfile from './AdminProfile';
import Search from './Search';

function Home() {
        
        const { isAuthenticated } = useAuth0();

        return (
                 <div>
                        { isAuthenticated ?
                                <AdminProfile /> :
                                <Search />
                        }
                 </div>
        )
}

export default Home;