import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import history from '../utils/history';
import SubjectAPI from '../Api/SubjectAPI';
import SubjectInfoAdmin from './SubjectInfoAdmin';
import Pagination from './Pagination';
import GenericModal from './massiveLoad/GenericModal';
import MassiveLoad from './massiveLoad/MassiveLoad';
// css
import "./ButtonBranding.css";
// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editConfig } from '../utils/toast-config';

const AdminProfile = () => {

    const massiveUpload = <MassiveLoad/>
    const subjectApi= new SubjectAPI();
    const [allSubjects, setAllSubjects] = useState([]);
    
    const [pageNumber, setPageNumber] = useState(0);
    const [sizeContent, setSizeContent] = useState(5); // el length del content que te retorna el page

    useEffect( () => {
        getAllSubjects(pageNumber)
    }, [])

    const getAllSubjects = (pageN) => {
        subjectApi.getAllSubjects(pageN,5).then( (resp) => { // 5 elementos para traer
            setAllSubjects(resp.data.content);
            setPageNumber(pageN);
            setSizeContentAux(pageN);
        }).catch( (e) => {
            console.log(e);
        })
    }

    const setSizeContentAux = (pageN) => { 
        subjectApi.getAllSubjects(pageN,5).then( (resp) => {
            setSizeContent(resp.data.content.length);
        }).catch( (e) => { console.log(e) })
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
        if(mode === "generalInfo") editGeneralInfo(id,objToPost);
        if(mode === "commissions") editCommissions(id,objToPost);
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
            <Container>
                <Row>
                    <h1>Panel de administrador/a</h1>
                </Row>
                <Row className="my-2">
                    <Col>
                        <ButtonGroup size="sm">
                            <Button className="btn btn-danger color-button" 
                                    onClick={() => goNewSubjectForm()}>Nueva Materia</Button>
                            <GenericModal children={massiveUpload} 
                                          title="Carga de Horarios por Archivo" 
                                          buttonLabel="Cargar Archivo"
                                          buttonStyle="btn btn-danger color-button"
                                          size="xs"/>
                        </ButtonGroup>                   
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <Card>
                        <Card.Title>Todas las Materias</Card.Title>
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
                            <ListGroup style={{height: "65px"}}>
                                <Pagination pageNumber={pageNumber}
                                            sizeContent={sizeContent}
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

