import React, { useState, useReducer, useEffect, useRef } from 'react';
import {Modal, Form, Container, Row, Col} from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import { areValidHours, isFirstHourGreaterThanSecond } from '../../utils/formValidator';
// css
import '../ButtonBranding.css';
import Select from 'react-select';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option key={day}>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

export default function ScheduleForm({classroomOptions, show, onHide, addSchedule, scheduleIdTentative}) {

    const defaultInvalidHourMessage = "La materia debe tener al menos dos horas de diferencia.";
    const startHourGreaterMessage = "La hora de inicio tiene que ser menor que la de fin.";

    // let tentativeId = 50;

    const subjectApi = new SubjectAPI();

    const [startTime,setStartTime] = useState(hours[0]);
    const [endTime,setEndTime] = useState(hours[0]);
    const [day, setDay] = useState(days[0]);
    // const [aulasOptions, setAulasOptions] = useState([]);
    const [classroom,setClassroom] = useState(classroomOptions[0].props.value);

    // validations
    const [validationState, setValidationState] = useReducer(
        (state, newState) => 
            ({...state, ...newState}),
            {
                classroomValidation: false,
                hoursValidation: false,
                errorMessage: defaultInvalidHourMessage
            }
    );
    // validations
    // const [hoursValidation, setHoursValidation] = useState(false);

    // const componentIsMounted = useRef(false);

    // Este seteo y return rompe en el unmount!
    // useEffect(() => { 
    //     return componentIsMounted.current = true;
    // }, []);

    // useEffect(() => {
    //     subjectApi.getAllClassrooms()
    //         .then( (resp) => {
    //             setAulasOptions(resp.data);
    //             setClassroom(resp.data[0]);
    //         }).catch( (e) => console.log(e) );
    //     // subjectApi.getAllClassrooms().then( (resp) => {
    //     //     if(componentIsMounted.current){
    //     //         setAulasOptions(resp.data);
    //     //         setClassroom(resp.data[0]);
    //     //     }
    //     // }).catch( (e) => console.log(e) );
    // }, []);

    const schedule = {
        id: scheduleIdTentative,
        startTime,
        endTime,
        classroom: {number:classroom},
        day
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateFields()
    }

    const validateFields = () => {
        let newSchedule = {
            id: 0,
            startTime: "",
            endTime: "0",
            classroom: {number:"0"},
            day: ""
        };

        let hourError = false;
        let classroomError = false;
        if(isFirstHourGreaterThanSecond(startTime, endTime)){
            showErrorHours(startHourGreaterMessage, true);
            hourError = true;
        }
        if(!hourError && !areValidHours(startTime, endTime)){
            showErrorHours(defaultInvalidHourMessage, true);
            hourError = true;
        }
        if(!classroom || classroom === "Seleccionar"){
            showErrorClassroom(true);
            classroomError = true;
        }
        if(classroomError || hourError){
            return ;
        }

        newSchedule = Object.assign(newSchedule,schedule);
        addSchedule(newSchedule);
        setValidationState({hoursValidation: false, classroomValidation: false});
        cleanUp();
        return onHide();
    }

    const showErrorHours = (errorMessage, error) => {
        var selectHours = document.getElementsByClassName("selectHours");
        if(error){
            selectHours[0].style.border = "1px solid red";
            selectHours[1].style.border = "1px solid red";
        } else {
            selectHours[0].style.border = "1px solid #ced4da";
            selectHours[1].style.border = "1px solid #ced4da";
        }
        
        setValidationState({hoursValidation: error, errorMessage: errorMessage});
    }

    const showErrorClassroom = (error) => {
        var selectClassroom = document.getElementsByClassName("selectClassroom");
        if(error){
            selectClassroom[0].style.border = "1px solid red";
        } else {
            selectClassroom[0].style.border = "1px solid #ced4da";
        }
        setValidationState({classroomValidation: error});
    }

    const cleanUp = () => {
        setStartTime(hours[0]);
        setEndTime(hours[0]);
        setDay(days[0]);
        setClassroom({number:classroomOptions[0].value});
        document.getElementById("addedSchedulesSection").style.border = "";
    }

    const hourValidationError = () =>{
        if(validationState.hoursValidation){
            return <small style={{color:"red"}}>{validationState.errorMessage}</small>;
        } 
        return <></>;
    }

    const classroomValidationError = () =>{
        if(validationState.classroomValidation){
            return <small style={{color:"red"}}>Debe seleccionar un aula</small>;
        } 
        return <></>;
    }

    const handleClassroomSelect = (event) => {
        showErrorClassroom(false);
        setClassroom(event.target.value);
    }

    const handleStartHourSelect = (event) => {
        showErrorHours("", false);
        setStartTime(event.target.value);
    }

    const handleEndHourSelect = (event) => {
        showErrorHours("", false);
        setEndTime(event.target.value);
    }

    return (
        <Modal show={show} >
            <Modal.Header>Nuevo schedule</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} data-toggle="validator" role="form">
                    <Container style={{backgroundColor:"#fff"}}>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora comienzo</Form.Label>
                                    <Form.Control
                                        className={"selectHours"}  
                                        as="select"
                                        value={startTime}
                                        onChange={(e) => handleStartHourSelect(e)}
                                        >
                                            {optionsHours}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora fin</Form.Label>
                                    <Form.Control
                                        className={"selectHours"} 
                                        as="select"
                                        value={endTime}
                                        onChange={(e) => handleEndHourSelect(e)} >
                                            {optionsHours}    
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                {hourValidationError()}
                            </Col>
                        </Row>
                        <Row><hr style={{height:"0.1px", width:"380px",backgroundColor:"#d3d3d3"}}></hr></Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Dia</Form.Label>
                                    <Form.Control as="select"
                                                  value={day}
                                                  onChange={ (e) => setDay(e.target.value)}>
                                        {optionDays}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Aula</Form.Label>
                                    <Form.Control className="selectClassroom"
                                                  as="select"
                                                  value={classroom}
                                                  onChange={ (e) => handleClassroomSelect(e)}
                                                  required>
                                        {classroomOptions}
                                    </Form.Control>
                                    {classroomValidationError()}
                                </Form.Group> 
                            </Col>
                        </Row>
                        <Row>
                            <button type="button" 
                                    className="btn btn-danger color-button" 
                                    onClick={ () => onHide()}
                                    style={{marginRight: "5px"}}>
                                Cerrar
                            </button>
                            <button type="submit" className="btn btn-danger color-button">
                                Agregar schedule
                            </button> 
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
