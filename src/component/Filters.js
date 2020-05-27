import SubjectAPI from "../Api/SubjectAPI";
// React
import React, {useState} from 'react';
// Bootstrap
import { Card, Col, Button, Form, FormGroup, Image } from 'react-bootstrap';
// Resources
import next from '../resources/next.png';
// CSS
import "./Filters.css";

const SearchType = Object.freeze({
    "bySubject":"bySubject", 
    "bySchedule":"bySchedule", 
    "byClassroom":"byClassroom",
    "byDay": "byDay"
});
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);
const days = Object.freeze(["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]);
const makeOptions = (optionsToMake) => {return optionsToMake.map((option)=><option key={option.toString()}>{option}</option>);}
const optionsHours = makeOptions(hours);
const optionsDays = makeOptions(days);

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

    const makeSuggestionsOptions = (suggestionsList) => {
        return suggestionsList.map(
            (suggestion) => <option key={suggestion}>{suggestion}</option>)
    }

    const searchFormFor = (label, submitHandler, placeHolder, onInputChangeHandler, suggestions, dataListId) => {
        return (
        <Form onSubmit={submitHandler}>
            <Form.Label as="h6">{label}</Form.Label>
            <FormGroup>
                <Form.Row>
                    <Col xs={10}>
                        <Form.Control list={dataListId}
                                      type="text"
                                      required
                                      placeholder={placeHolder}
                                      onChange={onInputChangeHandler}/>
                        <datalist id={dataListId}>
                            {makeSuggestionsOptions(suggestions)}
                        </datalist>
                    </Col>
                    <Col xs={2}>
                        <Button type="submit"
                                variant="outline-light">
                            <Image src={next}/>
                        </Button>
                    </Col>
                </Form.Row>
            </FormGroup>
        </Form>);
    }

    return (
        <>
            <Card>
                <Card.Header as="h5">Filtros de Materias</Card.Header>
                <Card.Body>
                    {
                        searchFormFor(
                            "Filtrar por nombre materia",
                            (e) => submitHandler(e, SearchType.bySubject),
                            "Ingrese nombre materia",
                            (e) => setSubject(e.target.value),
                            props.subjectSuggestions,
                            "subjectsOptions"
                        )
                    }
                    <Form onSubmit={(e) => submitHandler(e, SearchType.byDay)}>
                        <Form.Label as="h6">Filtrar por Día</Form.Label>
                        <FormGroup> 
                            <Form.Row>
                                <Col xs={10}>
                                    <Form.Control as="select"
                                                  value={selectedDay}
                                                  custom 
                                                  placeholder="Día"
                                                  onChange={ (e) => setSelectedDay(e.target.value)}> 
                                        {optionsDays} 
                                    </Form.Control>
                                </Col>    
                                <Col xs={2}>
                                    <Button type="submit"
                                            variant="outline-light">
                                        <Image src={next}/>
                                    </Button>
                                </Col>
                            </Form.Row>
                        </FormGroup>
                    </Form>
                    <Form onSubmit={(e) => submitHandler(e, SearchType.bySchedule)}>
                        <Form.Label as="h6">Filtrar por horario</Form.Label>
                        <FormGroup> 
                            <Form.Row>
                                <Col xs={4}>
                                    <Form.Control as="select"
                                                    value={startHour}
                                                    custom 
                                                    placeholder="Desde"
                                                    onChange={ (e) => setStartHour(e.target.value)}> 
                                        {optionsHours} 
                                    </Form.Control>
                                </Col>    
                                <Col xs={2}/>
                                <Col xs={4}>
                                    <Form.Control as="select" 
                                                    value={endHour}
                                                    custom 
                                                    placeholder="Hasta"
                                                    onChange={ (e) => setEndHour(e.target.value)}>
                                        {optionsHours}
                                    </Form.Control>
                                </Col>
                                <Col xs={2}>
                                    <Button type="submit"
                                            variant="outline-light">
                                        <Image src={next}/>
                                    </Button>
                                </Col>
                            </Form.Row>
                        </FormGroup>
                    </Form>
                    {
                        searchFormFor(
                            "Filtrar por Nro de aula",
                            (e) => submitHandler(e, SearchType.byClassroom),
                            "Ingrese número de aula",
                            (e) => setClassroomNumber(e.target.value),
                            props.classroomSuggestions,
                            "classroomOptions"
                        )
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default Filters;