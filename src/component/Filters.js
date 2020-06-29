import SubjectAPI from "../Api/SubjectAPI";
// React
import React, {useState} from 'react';
// Bootstrap
import { Card, Col, Button, Form, FormGroup, Image } from 'react-bootstrap';
// Resources
import next from '../resources/next.png';
// CSS
import "./Filters.css";
// Own Components
import DaySearchForm from "./filters/DaySearchForm";
import InputSearchForm from "./filters/InputSearchForm";
import BetweenHoursSearchForm from "./filters/BetweenHoursSearchForm";
import { SearchType, hours, days } from "../Constants/Config";

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
                <Card.Header as="h5">Filtros de Materias</Card.Header>
                <Card.Body>
                    <InputSearchForm label = "Filtrar por nombre materia"
                                     submitHandler = {submitHandler}
                                     placeHolder = "Ingrese nombre materia"
                                     onInputChangeHandler = {setSubject}
                                     dataListId = "subjectsOptions"
                                     suggestions = {props.subjectSuggestions}
                                     searchType = {SearchType.bySubject}/>
                    <DaySearchForm label = "Filtrar por Día"
                                   submitHandler = {submitHandler}
                                   onInputChangeHandler = {setSelectedDay}
                                   selectOptions = {makeSelectOptions(days)}
                                   searchType = {SearchType.byDay}/>
                    <BetweenHoursSearchForm label = "Filtrar por horario"
                                            submitHandler = {submitHandler}
                                            startValue = {startHour}
                                            setStartValue = {setStartHour}
                                            endValue = {endHour}
                                            setEndValue = {setEndHour}
                                            optionsHours = {makeSelectOptions(hours)}
                                            searchType = {SearchType.bySchedule}/>
                    <InputSearchForm label = "Filtrar por Nro de aula"
                                     submitHandler = {submitHandler}
                                     placeHolder = "Ingrese número de aula"
                                     onInputChangeHandler = {setClassroomNumber}
                                     dataListId = "classroomOptions"
                                     suggestions = {props.classroomSuggestions}
                                     searchType = {SearchType.byClassroom}/>
                </Card.Body>
            </Card>
        </>
    );
};

export default Filters;