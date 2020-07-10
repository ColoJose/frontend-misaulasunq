import React, { useState, useReducer } from 'react';
import {Modal, Form, Container, Row, Col} from 'react-bootstrap';
import { areValidHours, isFirstHourGreaterThanSecond } from '../../utils/formValidator';
import { hours, days } from "../../Constants/Config";
// css
import '../ButtonBranding.css';

const optionDays = days.map( (day) => <option key={day} value={day} label={day}>{day}</option>);

let optionsHours = hours.map( (hs) => <option key={hs} value={hs} label={hs}>{hs}</option>);

export default function ScheduleFormEdit({ classroomsOptions, show, onHide, addSchedule }) {
    const defaultInvalidHourMessage = "La materia debe tener al menos dos horas de diferencia.";
    const startHourGreaterMessage = "La hora de inicio tiene que ser menor que la de fin.";

    const [startTime,setStartTime] = useState(hours[0]);
    const [endTime,setEndTime] = useState(hours[0]);
    const [day, setDay] = useState(days[0]);
    const [classroom,setClassroom] = useState(classroomsOptions[0].props.value);
    
    // validations
    const [validationState, setValidationState] = useReducer(
        (state, newState) => 
            ({...state, ...newState}),
            {
                hoursValidation: false,
                errorMessage: defaultInvalidHourMessage
            }
    );

    const schedule = {
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
        addSchedule(schedule);
        setValidationState({hoursValidation: false});
        cleanUp();
        return onHide();
    }

    const cleanUp = () => {
        setStartTime(hours[0]);
        setEndTime(hours[0]);
        setDay(days[0]);
        setClassroom(classroomsOptions[0].props.value);
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

    const hourValidationError = () =>{
        if(validationState.hoursValidation){
            return <small style={{color:"red"}}>{validationState.errorMessage}</small>;
        } 
        return <></>;
    }

    const classroomValidationError = () =>{
        if(validationState.classroomValidation){
            return <small style={{color:"red"}}>Debe seleccionar un aula.</small>;
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
            <Modal.Header>Nuevo Schedule</Modal.Header>
                <Modal.Body>
                    <Form id="schedule-form"
                          onSubmit={handleSubmit} 
                          data-toggle="validator">
                    <Container style={{backgroundColor:"#fff"}}>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora de comienzo</Form.Label>
                                    <Form.Control className={"selectHours"}  
                                                  as="select"
                                                  value={startTime}
                                                  maxMenuHeight={150}
                                                  onChange={(e) => handleStartHourSelect(e)}>
                                        {optionsHours}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora de fin</Form.Label>
                                    <Form.Control className={"selectHours"} 
                                                  as="select"
                                                  value={endTime}
                                                  maxMenuHeight={150}
                                                  onChange={(e) => handleEndHourSelect(e)}>
                                        {optionsHours}    
                                    </Form.Control>
                                </Form.Group>
                            </Col>                            
                            <Col xs={12}>
                                {hourValidationError()}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Día</Form.Label>
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
                                        {classroomsOptions}
                                    </Form.Control>
                                    {classroomValidationError()}
                                </Form.Group>
                            </Col>                            
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-2">
                <Row xs={2} className="w-100">
                    <Col xs={6} className="d-flex justify-content-start pl-1">
                        <button type="button" 
                                className="btn btn-danger color-button w-50" 
                                onClick={ () => onHide()}>
                            Cancelar
                        </button>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end pr-1">
                        <button type="submit" 
                                form="schedule-form"
                                className="btn btn-danger color-button w-50">
                            Agregar
                        </button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}
