import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import history from '../utils/history';
import SubjectAPI from '../Api/SubjectAPI';
import SubjectInfoAdmin from './SubjectInfoAdmin';
import Pagination from './Pagination';
import "./ButtonBranding.css";
// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editConfig } from '../utils/toast-config';

const AdminProfile = () => {

    const subjectApi= new SubjectAPI();
    const [allSubjects,setAllSubjects] = useState([]);
    
    const [pageNumber, setPageNumber] = useState(0);
    const [nextPageIsEmpty, setNextPageIsEmpty] = useState(false);
    
    useEffect( () => {
        getAllSubjects()
    }, [])

    const getAllSubjects = () => {
        subjectApi.getAllSubjects(pageNumber,5).then( (resp) => { // 5 elementos para traer
            setAllSubjects(resp.data.content);
            setPageNumber(pageNumber + 1);
            setNextPageIsEmptyAux();
        }).catch( (e) => {
            console.log(e);
        })
    }
    

    const setNextPageIsEmptyAux = () => { 
        subjectApi.getAllSubjects(pageNumber,5).then( (resp) => {
            console.log(resp.data.content)
            setNextPageIsEmpty(resp.data.empty)
        }).then( (e) => { console.log(e) })
    }

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
            editGeneralInfoSuccess(resp.data.name);
        }).catch( (e) => console.log(e) )
    }

    const editGeneralInfoSuccess = (name) => { toast.success(`Actualizó correctamente la materia ${name}`, editConfig) }

    return (
        <div style={{width:"100%"}}>
            <h1>Panel de administrador/a</h1>
            <button className="btn btn-danger color-button" onClick={ () => goNewSubjectForm()}>Cargar nueva materia</button>
            <h3></h3>
            <Container>
                <Row>
                    <Col xs={8}>
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
                            <ListGroup style={{height: "60px"}}>
                                <Pagination pageNumber={pageNumber}
                                            nextPageIsEmpty={nextPageIsEmpty}
                                            getAllSubjects={getAllSubjects} />
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col xs={4}>Completar</Col>
                </Row>
            </Container>
            
        </div>
    );

}

export default AdminProfile;

