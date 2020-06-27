
import React, { useState, useEffect, useReducer } from 'react';
import { Card, ListGroup, Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
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

    const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
                                                               {allSubjects: [], pageNumber: 0, nextSizeContent: null});

    const [isPopoverEditOpen, setIsPopoverEditOpen] = useState(false);                                                               
    const elems = 5; // cantidad de elemntos que trae el cada page

    const massiveUpload = <MassiveLoad/>
    const subjectApi= new SubjectAPI();
    const [allSubjects, setAllSubjects] = useState([]);
    
    const [pageNumber, setPageNumber] = useState(0);
    const [sizeContent, setSizeContent] = useState(5); // el length del content que te retorna el page

    useEffect( () => {
        getAllSubjects(state.pageNumber)
    }, [])

    const getAllSubjects = (pageN) => {
        subjectApi.getAllSubjects(pageN,elems)
                    .then( (resp) => resp.data)
                    .then( (data) => {
                        setState({allSubjects:data.subjectsDTO});
                        return data;
                    }).then( (data) => {
                        setState({pageNumber:pageN, nextSizeContent:data.nextPageSize})
                    })
                    .catch( (e) => {
                        console.log(e);
        })
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

    const handleEditButtons = (idEditButton) => {
        setIsPopoverEditOpen(!isPopoverEditOpen);
        var editButtons = document
                            .getElementsByClassName("button-edit");

        var filterButtons = Array.prototype.filter.call(editButtons, function(btn){
            return btn.id != idEditButton;
        })

        if ( isPopoverEditOpen ) {
            enableEditButtons(filterButtons);
        }else {
            disableButtons(filterButtons);
        }
    }

    const enableEditButtons = (editButtons) => { setDisabledButtons(editButtons, false) }
    const disableButtons = (editButtons) => { setDisabledButtons(editButtons, true) }

    const setDisabledButtons = (buttons,bool) => {
        Array.prototype.map.call(buttons, function(btn){
            return btn.disabled = bool;
        })
    }
 

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
                                    state.allSubjects.map( (subject) => {
                                        return  <SubjectInfoAdmin 
                                                    key={subject.id}
                                                    subject={subject}
                                                    selectSubjectTo={selectSubjectTo}
                                                    handleEditButtons={handleEditButtons} />
                                    })
                                    
                                }
                            </ListGroup>
                            <ListGroup style={{height: "65px"}}>
                                <Pagination pageNumber={state.pageNumber}
                                            nextSizeContent={state.nextSizeContent}
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

