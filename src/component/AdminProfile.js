import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import history from '../utils/history';
import "./AdminProfile.css";
import SubjectAPI from '../Api/SubjectAPI';
import SubjectInfoAdmin from './SubjectInfoAdmin';
import EditGeneralInfo from '../component/editSubject/EditGeneralInfo';
import "./ButtonBranding.css";

const AdminProfile = () => {

    const subjectApi= new SubjectAPI();
    const [allSubjects,setAllSubjects] = useState([]);
    
    useEffect( () => {
        subjectApi.getAllSubjects().then( (resp) => {
            setAllSubjects(resp.data);
        }).catch( (e) => {
            console.log(e);
        })
    }, [setAllSubjects])

    const goNewSubjectForm = () => {
        history.push('/admin/newsubjectform');
    }
    
    const selectSubjectTo = (subject,mode,objToPost) => {
        if(mode==="delete") {
            deleteSubject(subject.id);
        }else{
            editSubject(subject.id,mode,objToPost);
        }
    }

    const deleteSubject = (id) => { }

    // edit functions

    const editSubject = (id,mode,objToPost) => {
        if(mode=== "generalInfo") editGeneralInfo(id,objToPost);
        if(mode=== "commissions");editCommissions(id,objToPost);
    }

    const editCommissions = (id, objToPost) => { console.log("edit commissions") }

    const editGeneralInfo = (id,objToPost) => { 
        subjectApi.editGeneralInfoSubject(id,objToPost).then( (resp) => {
            alert(`Actualizó correctamente la mteria ${resp.data.name}`);
        }).catch( (e) => console.log(e) )
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

