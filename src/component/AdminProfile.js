import React from 'react';
import history from '../utils/history';
import "./ButtonBranding.css";

const AdminProfile = () => {

    const goNewSubjectForm = () => {
        history.push('/admin/newsubjectform')
    }

    return (
        <div style={{width:"100%"}}>
            <h1>Adminn</h1>
            <button className="btn btn-danger color-button" onClick={ () => goNewSubjectForm()}>Cargar nueva materia</button>
        </div>
    )

}

export default AdminProfile;