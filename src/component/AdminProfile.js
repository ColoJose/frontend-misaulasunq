import React from 'react';
import history from '../utils/history'

const AdminProfile = () => {

    const goNewSubjectForm = () => {
        history.push('/admin/newsubjectform')
    }

    return (
        <>
            <h1>Adminn</h1>
            <button onClick={ () => goNewSubjectForm()}>Cargar nueva materia</button>
        </>
    )

}

export default AdminProfile;