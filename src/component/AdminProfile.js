import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import history from '../utils/history';
import "./AdminProfile.css";
import SubjectAPI from '../Api/SubjectAPI';
import SubjectInfoAdmin from './SubjectInfoAdmin';
import EditGeneralInfo from '../component/editSubject/EditGeneralInfo';

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

    const selectSubjectTo = (id,mode,subjectPart) => {
        if(mode==="delete") {
            deleteSubject(id);
        }else{
            editSubject(id,subjectPart);
        }
    }

    const deleteSubject = (id) => { }

    const editSubject = (id,subjectPart) => {
        if(subjectPart=== "generalInfo"); //editGeneralInfo(id);
        if(subjectPart=== "commissions"); //editCommissions(id);
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
                                        subject={subject}
                                        selectSubjectTo={selectSubjectTo}/>
                        })
                    }
                </ListGroup>
            </Card>
            
            
        </div>
    );

}

export default AdminProfile;

