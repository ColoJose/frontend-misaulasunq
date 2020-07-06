import React, {useEffect, useReducer} from 'react';
// BootStrap imports
import { Container, Col, Row } from 'react-bootstrap';
// Semantic UI
import { Dimmer, Loader } from 'semantic-ui-react';
// components and internal resources imports
import Filters from './filters/Filters.js';
import SubjectsInfo from './subject information/SubjectsInfo.js';
import SubjectAPI from "../Api/SubjectAPI";
import ClassroomAPI from "../Api/ClassroomAPI";
// CSS
import "./Main.css";

function Main() {

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            subjects: [], 
            notFound: true, 
            subjectResultTitle: "Materias Del Día",
            searching: true,
            subjectSuggestionsLoaded: false,
            classroomSuggestionsLoaded: false,
            subjectSuggestions: [],
            classroomSuggestions: [],
        }
    );

    const startSearching = (itsSearching = true) => {
        setState({searching: itsSearching});
    }

    const handleSearchResult = (subjectsToSet = [], founded = true, title = "Materias Del Día", itsSearching = false) => {
        setState({subjects: subjectsToSet, notFound: founded, subjectResultTitle:title, searching:itsSearching});
    }

    // The empty Array indicates which this effect only executes on the first rendering
    useEffect (() => { 
        const classroomApi = new ClassroomAPI();
        const subjectApi = new SubjectAPI();
        subjectApi.getCurrentDaySubjects()
                .then( (resp) => {
                    handleSearchResult(resp.data,false);
                }).catch(e => {
                    handleSearchResult();
                });
        subjectApi.getSubjectSuggestions().then( (resp) => {
                    setState({subjectSuggestions: resp.data, subjectSuggestionsLoaded: true});
                }).catch(e => {
                    setState({subjectSuggestions: [], subjectSuggestionsLoaded: true});
                });
        classroomApi.getClassroomSuggestions().then( (resp) => {
                    setState({classroomSuggestions: resp.data, classroomSuggestionsLoaded: true});
                }).catch(e => {
                    setState({classroomSuggestions: [], classroomSuggestionsLoaded: true});
                });
      }, []); 

    const loadingIncomplete = () => {
        return state.searching  || !state.subjectSuggestionsLoaded || !state.classroomSuggestionsLoaded;
    }
    return (
        <Container className="container" 
                   fluid>
            <Row className="h-100 pt-3 pt-lg-2 pt-xl-2">
                <Col className="mb-3 mb-xs-3 mb-md-3 pt-xl-2 pt-lg-2 my-lg-0 my-xl-0 justify-content-start"
                     xs={12}
                     md={6}
                     lg={4}
                     xl={4}>
                    <Filters handleSearchResult={handleSearchResult}
                             searching={startSearching}
                             subjectSuggestions={state.subjectSuggestions}
                             classroomSuggestions={state.classroomSuggestions}/>
                </Col>
                <Col className="mt-1 mt-xs-1 mt-md-1 pt-xl-2 pt-lg-2 my-lg-0 my-xl-0 scroll-overflow justify-content-center"
                     xs={12}
                     md={6}
                     lg={8}
                     xl={8}>
                    <SubjectsInfo subjects={state.subjects}
                                  notFound={state.notFound}
                                  title={state.subjectResultTitle}/>
                </Col>
                <Dimmer active={loadingIncomplete()}>
                    <Loader indeterminate>Cargando...</Loader>
                </Dimmer>
            </Row>
        </Container>
    )
}

export default Main; 