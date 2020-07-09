import React,  { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { Card, ListGroup, Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import history from '../utils/history';
import SubjectAPI from '../Api/SubjectAPI';
import SubjectInfoAdmin from './SubjectInfoAdmin';
import Pagination from './Pagination';
import GenericModal from './massiveLoad/GenericModal';
import MassiveLoad from './massiveLoad/MassiveLoad';
import OverlapList from './overlapNotices/OverlapList';
import TodoList from './TodoList';
// css
import "./ButtonBranding.css";
// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editConfig } from '../utils/toast-config';

const AdminProfile = () => {

    const [state, setState] = useReducer(
        (state, newState) => 
                ({...state, ...newState}),
                {allSubjects: [], pageNumber: 0, totalPages: 0, firstPage: "true", lastPage: "false"});

    const [isPopoverEditOpen, setIsPopoverEditOpen] = useState(false);                                                               
    const elems = 5; // cantidad de elemntos que trae cada page
    const subjectApi = new SubjectAPI;
    const massiveUpload = <MassiveLoad/>;

    useEffect( () => {
        getAllSubjects(state.pageNumber)
    }, [])

    const getAllSubjects = (pageN) => {
        subjectApi.getAllSubjects(pageN,elems)
                .then( (resp) => {
                        setState(
                            {
                                allSubjects: resp.data.content,
                                pageNumber: resp.data.pageable.pageNumber, 
                                totalPages: resp.data.totalPages,
                                firstPage: resp.data.first,
                                lastPage: resp.data.last
                            });
                        })
                .catch( (e) => {console.log(e);});
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
            updateSubjectList()
        }).catch( (e) => console.log(e) )
    }

    const updateSubjectList = () => {
        getAllSubjects(state.pageNumber);
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


    const goHome = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById("admin-container"));
        history.push('/home');
    }
    
    const renderSubjectsListItem = () => {
        return state.allSubjects.map( 
            (subject) => {
                return <SubjectInfoAdmin key={subject.id}
                                         subject={subject}
                                         selectSubjectTo={selectSubjectTo}
                                         handleEditButtons={handleEditButtons}/>
        });
    }

    return (
        <Container id="admin-container">
            <Row style={{marginBottom:"15px", marginTop:"15px"}}>
                    <h1>
                        <span style={{color:"#e2e3de"}}>f</span>
                        Panel de administrador/a
                    </h1>
            </Row>
            <Row className="my-2">
                <Col>
                    <Button className="btn btn-danger color-button" 
                            onClick={() => goNewSubjectForm()}
                            style={{marginRight:"5px"}}>Crear nueva materia</Button>
                    <GenericModal children={massiveUpload} 
                                    title="Carga de Horarios por Archivo" 
                                    buttonLabel="Cargar Archivo"
                                    buttonStyle="btn btn-danger color-button"
                                    size="xs"
                                    />
                </Col>
            </Row>
            <Row style={{height: "100%"}}>
                <Col xs={8}>
                    <Card className="border" style={{height: "95%"}}>
                        <Card.Header style={{backgroundColor: '#832d1c', fontWeight: '500', color:'#fff'}}>
                            Todas las Materias
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush" 
                                       style={{height: "100%"}}>
                                {renderSubjectsListItem()}
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Pagination pageNumber={state.pageNumber}
                                        totalPages={state.totalPages}
                                        firstPage={state.firstPage}
                                        lastPage={state.lastPage}
                                        pageFunction={getAllSubjects} />
                        </Card.Footer>                    
                    </Card>
                </Col>
                <Col xs={4}>
                    {/* <OverlapList/> */}
                    <TodoList />
                </Col>
            </Row>
        </Container>
    );

}

export default AdminProfile;

