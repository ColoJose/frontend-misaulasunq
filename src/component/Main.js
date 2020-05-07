import React, {useEffect, useReducer} from 'react';
// BootStrap imports
import { Container, Col, Row } from 'react-bootstrap';
// components and internal resources imports
import Filters from './Filters.js';
import SubjectsInfo from './subject information/SubjectsInfo.js';
import SubjectAPI from "../Api/SubjectAPI";
// CSS
import "./Main.css";

function Main() {

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {subjects: [], notFound: true, subjectResultTitle:"Materias Del Día"}
    )

    const handleSearchResult = (subjectsToSet = [], founded = true, title = "Materias Del Día" ) => {
        setState({subjects: subjectsToSet, notFound: founded, subjectResultTitle:title})
    }

    // The empty Array indicates which this effect only executes on the first rendering
    useEffect (() => { 
        const subjectApi = new SubjectAPI();
        subjectApi.getCurrentDaySubjects()
                .then( resp =>{
                    handleSearchResult(resp.data, false);
                }).catch(e => {
                    handleSearchResult();
                })
      }, []) 

    return (
        <Container className="container" 
                   fluid>
            <Row className="main">
                <Col className="justify-content-start col-Filter"
                     xs={4}>
                    <Filters handleSearchResult={handleSearchResult}/>
                </Col>
                <Col className="justify-content-center col-Subjects"
                     xs={8}>
                    <SubjectsInfo subjects={state.subjects}
                                  notFound={state.notFound}
                                  title={state.subjectResultTitle}/>
                </Col>
            </Row>
        </Container>
    )
};

export default Main; 