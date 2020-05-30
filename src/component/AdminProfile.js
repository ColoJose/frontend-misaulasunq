import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import history from '../utils/history';
import "./AdminProfile.css";
import SubjectAPI from '../Api/SubjectAPI';
import SubjectInfoAdmin from './SubjectInfoAdmin';

const AdminProfile = () => {

    const subjectApi= new SubjectAPI();
    const [allSubjects,setAllSubjects] = useState([]);

    useEffect( () => {
        subjectApi.getAllSubjects().then( (resp) => {
            setAllSubjects(resp.data);
        }).catch( (e) => {
            console.log(e);
        })
    }, [])

    const goNewSubjectForm = () => {
        history.push('/admin/newsubjectform');
    }

    return (
        <div style={{width:"100%"}}>
            <h1>Panel de administrador/a</h1>
            <button className="btn btn-danger color-button" onClick={ () => goNewSubjectForm()}>Cargar nueva materia</button>
            <h3></h3>
            <Card>
                <Card.Title>Todas las materias</Card.Title>
                <ListGroup>
                    {
                        allSubjects.map( (subject) => {
                            return <SubjectInfoAdmin 
                                        key={subject.id}
                                        subject={subject}/>
                        })
                    }
                </ListGroup>
            </Card>
            
            
        </div>
    );

}

export default AdminProfile;