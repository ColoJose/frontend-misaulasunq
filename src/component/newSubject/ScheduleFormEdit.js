import React, { useState, useReducer } from 'react';
import {Modal, Form, Row, Col, Container} from 'react-bootstrap';
import { areValidHours, isFirstHourGreaterThanSecond } from '../../utils/formValidator';
import { hours, days } from "../../Constants/Config";
// css
import '../ButtonBranding.css';

const optionDays = days.map( (day) => <option key={day} value={day} label={day}>{day}</option>);
let optionsHours = hours.map( (hs) => <option key={hs} value={hs} label={hs}>{hs}</option>);

export default function ScheduleFormEdit({ classroomOptions, scheduleToEdit, showEdit, onHideEdit, modifyItemSchedule }) {

    const defaultInvalidHourMessage = "La materia debe tener al menos dos horas de diferencia.";
    const startHourGreaterMessage = "La hora de inicio tiene que ser menor que la de fin.";

    const [id,setId] = useState(scheduleToEdit.id);
    const [startTime,setStartTime] = useState(scheduleToEdit.startTime);
    const [endTime,setEndTime] = useState(scheduleToEdit.endTime);
    const [day, setDay] = useState(scheduleToEdit.day);
    const [classroom,setClassroom] = useState(scheduleToEdit.classroom.number);
    
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
        id,
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
        if(isFirstHourGreaterThanSecond(startTime, endTime)){
            showErrorHours(startHourGreaterMessage);
            return ;
        }
        if(!areValidHours(startTime, endTime)){
            showErrorHours(defaultInvalidHourMessage);
            return ;
        }
        modifyItemSchedule(schedule);
        
        setValidationState({hoursValidation: false});
        return onHideEdit();
    }

    const showErrorHours = (errorMessage) => {
        var selectHours = document.getElementsByClassName("selectHours");
        selectHours[0].style.border = "1px solid red";
        selectHours[1].style.border = "1px solid red";
        setValidationState({hoursValidation: true, errorMessage: errorMessage});
    }
    
    const hourValidationError = () =>{
        if(validationState.hoursValidation){
            return <small style={{color:"red"}}>{validationState.errorMessage}</small>;
        } 
        return <></>;
    }

    const handleClassroomSelect = (event) => {
        console.log(classroom);
        setClassroom(event.target.value);
    }

    return (
        <Modal show={showEdit} >
            <Modal.Header>Editar Schedule</Modal.Header>

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
                                                  onChange={(e) => setStartTime(e.target.value)}>
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
                                                  onChange={(e) => setEndTime(e.target.value)}>
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
                                    <Form.Control as="select"
                                                  className="form-control"
                                                  defaultValue={classroom}
                                                  onChange={ (e) => handleClassroomSelect(e)}
                                                  required>
                                            {classroomOptions.slice(1)}
                                    </Form.Control>
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
                                onClick={ () => onHideEdit()}>
                            Cancelar
                        </button>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end pr-1">
                        <button type="submit"
                                form="schedule-form"
                                className="btn btn-danger color-button w-50">
                            Modificar
                        </button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}
