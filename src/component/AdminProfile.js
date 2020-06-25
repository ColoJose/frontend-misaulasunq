import React, { useState, useEffect, useReducer } from 'react';
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

    const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
                                                               {allSubjects: [], pageNumber: 0, nextSizeContent: null});

    const [isPopoverEditOpen, setIsPopoverEditOpen] = useState(false);                                                               
    const subjectApi= new SubjectAPI();
    const elems = 5; // cantidad de elemntos que trae el cada page

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
        if(mode=== "generalInfo") editGeneralInfo(id,objToPost);
        if(mode=== "commissions") editCommissions(id,objToPost);
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

