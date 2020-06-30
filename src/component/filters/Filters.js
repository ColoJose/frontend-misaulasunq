import SubjectAPI from "../../Api/SubjectAPI";
// React
import React, {useState} from 'react';
// Bootstrap
import { Card, Accordion } from 'react-bootstrap';
// CSS
import "./Filters.css";
import "../HeaderBranding.css";
// Own Components
import DaySearchForm from "./DaySearchForm";
import InputSearchForm from "./InputSearchForm";
import BetweenHoursSearchForm from "./BetweenHoursSearchForm";
import { SearchType, hours, days } from "../../Constants/Config";

const Filters = (props) => {

    const [subject, setSubject] = useState("");
    const [classroomNumber, setClassroomNumber] = useState("");
    const [startHour, setStartHour] = useState("07:00");
    const [endHour, setEndHour] = useState("22:00");
    const [selectedDay, setSelectedDay] = useState("Lunes");

    const fetchResolver = (promise, title) =>{
        promise.then( resp =>{
            props.handleSearchResult(resp.data, false, title);
        }).catch(e => {
            props.handleSearchResult([], true);
        })
    };

    const filterBySubject = (subjectApi) =>{
        fetchResolver(
            subjectApi.getSubjectsByName(subject),
            "Materias Filtradas por Nombre");
    }
     
    const filterBySchedule = (subjectApi) => {
        fetchResolver(
            subjectApi.getSubjectsBySchedule(
                startHour, endHour),
                "Materias Filtradas por Horario");
    }

    const filterByNumberOf = (subjectApi) => {
        fetchResolver(
            subjectApi.getSubjectsByClassroomNumber(classroomNumber),
            "Materias Filtradas por Número de Aula");
    }

    const filterByDay = (subjectApi) => {
        fetchResolver(
            subjectApi.getSubjectsDictatedOnDay(selectedDay),
            "Materias Filtradas por Día");
    }

    const submitHandler = (event, searchType) => {
        props.searching();
        event.preventDefault();

        const subjectApi = new SubjectAPI();

        switch (searchType) {
            case SearchType.bySubject:
                filterBySubject(subjectApi);
                break;
            case SearchType.bySchedule:
                filterBySchedule(subjectApi);
                break;
            case SearchType.byClassroom:
                filterByNumberOf(subjectApi);
                break;
            case SearchType.byDay:
                filterByDay(subjectApi);
                break;
            default:
                props.searching(false);
        }
    }

    const makeSelectOptions = (suggestionsList) => {
        return suggestionsList.map(
            (suggestion) => {   return {value: suggestion, label: suggestion};  })
    }

    return (
        <>
            <Card>
                <Card.Header className = "header-branding">Filtrar Materias:</Card.Header>
                <Card.Body className = "px-0 py-0">
                    <Accordion defaultActiveKey = "0">
                        <Accordion.Toggle as = {Card.Header} 
                                          className = "h6 font-weight-bold" 
                                          variant = "link" 
                                          eventKey = "0">
                            Por Nombre
                        </Accordion.Toggle>
                        <Accordion.Collapse className = "px-4 py-1" eventKey = "0">
                            <InputSearchForm submitHandler = {submitHandler}
                                             placeHolder = "Ingrese nombre materia"
                                             onInputChangeHandler = {setSubject}
                                             dataListId = "subjectsOptions"
                                             suggestions = {props.subjectSuggestions}
                                             searchType = {SearchType.bySubject}/>
                        </Accordion.Collapse>
                        <Accordion.Toggle as = {Card.Header} 
                                          className = "h6 font-weight-bold" 
                                          variant = "link" 
                                          eventKey = "1">
                            Por Día
                        </Accordion.Toggle>
                        <Accordion.Collapse className = "px-4 py-1" eventKey = "1">
                            <DaySearchForm submitHandler = {submitHandler}
                                           onInputChangeHandler = {setSelectedDay}
                                           selectOptions = {makeSelectOptions(days)}
                                           searchType = {SearchType.byDay}/>
                        </Accordion.Collapse>
                        <Accordion.Toggle as = {Card.Header} 
                                          className = "h6 font-weight-bold" 
                                          variant = "link" 
                                          eventKey = "2">
                            Por Horario
                        </Accordion.Toggle>
                        <Accordion.Collapse className = "px-4 py-1" eventKey = "2">
                            <BetweenHoursSearchForm labelSelectOne = "Desde"
                                                    labelSelectTwo = "Hasta"
                                                    submitHandler = {submitHandler}
                                                    startValue = {startHour}
                                                    setStartValue = {setStartHour}
                                                    endValue = {endHour}
                                                    setEndValue = {setEndHour}
                                                    optionsHours = {makeSelectOptions(hours)}
                                                    searchType = {SearchType.bySchedule}/>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} 
                                          className="h6 font-weight-bold" 
                                          variant="link" 
                                          eventKey="3">
                            Por Aula
                        </Accordion.Toggle>
                        <Accordion.Collapse className="px-4 py-1" eventKey="3">
                            <InputSearchForm submitHandler = {submitHandler}
                                             placeHolder = "Ingrese número de aula"
                                             onInputChangeHandler = {setClassroomNumber}
                                             dataListId = "classroomOptions"
                                             suggestions = {props.classroomSuggestions}
                                             searchType = {SearchType.byClassroom}/>
                        </Accordion.Collapse>
                    </Accordion>
                </Card.Body>
            </Card>
        </>
    );
};

export default Filters;