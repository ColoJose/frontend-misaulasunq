import React, { useState, useEffect, useRef } from 'react';
import {Modal, Form, Row, Col, Container} from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import { areValidHours } from '../../utils/formValidator';
// css
import '../ButtonBranding.css';
import Select from 'react-select';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

export default function ScheduleFormEdit({ scheduleToEdit, showEdit, onHideEdit, modifyItemSchedule }) {

    const subjectApi = new SubjectAPI();

    const [startTime,setStartTime] = useState(scheduleToEdit.startTime);
    const [endTime,setEndTime] = useState(scheduleToEdit.endTime);
    const [day, setDay] = useState(scheduleToEdit.day);
    const [aulasOptions, setAulasOptions] = useState([]);
    const [classroom,setClassroom] = useState(scheduleToEdit.classroom);
    // validations
    const [hoursValidation, setHoursValidation] = useState(false);

    const componentIsMounted = useRef(false);

    useEffect(() => {
        return componentIsMounted.current = true;
    }, []);

    useEffect(() => {
        subjectApi.getAllClassrooms().then( (resp) => {
            if(componentIsMounted.current){
                setAulasOptions(resp.data);
                setClassroom(resp.data[0]);
            }
        }).catch( (e) => console.log(e) );
    }, []);

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
        if(  areValidHours(startTime, endTime)) {
            modifyItemSchedule(schedule);
            setHoursValidation(false);
            // cleanUp();
            return onHideEdit();            
        }else {
            showErrorHours();
            return;
        }
    }

    const showErrorHours = () => {
        setHoursValidation(true)
        var selectHours = document.getElementsByClassName("selectHours");
        selectHours[0].style.border = "1px solid red";
        selectHours[1].style.border = "1px solid red";
    }

    // const cleanUp = () => {
    //     setStartTime(hours[0]);
    //     setEndTime(hours[0]);
    //     setDay(days[0]);
    //     setClassroom(aulasOptions[0]);
    //     document.getElementById("addedSchedulesSection").style.border = "";
    // }

    function invalidHoursErrorMessage() { return"La materia debe tener al menos dos horas de diferencia"}

    return (
        <Modal show={showEdit} >
            <Modal.Header>Nuevo schedule</Modal.Header>
            
        
            <Modal.Body>
                <Form onSubmit={handleSubmit} data-toggle="validator" role="form">
                    <Container style={{backgroundColor:"#fff"}}>
                        {/* hora comiento, hora  fin*/}
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora comienzo</Form.Label>
                                    <Form.Control
                                        className={"selectHours"}  
                                        as="select"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        >
                                            {optionsHours}
                                    </Form.Control>
                                    {
                                        hoursValidation ? <small style={{color:"red"}}>{invalidHoursErrorMessage()}</small> : null
                                    }
                                </Form.Group>
                            </Col>    
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Hora fin</Form.Label>
                                    <Form.Control
                                        className={"selectHours"} 
                                        as="select"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)} >
                                            {optionsHours}    
                                    </Form.Control>
                                    {
                                        hoursValidation ? <small style={{color:"red"}}>{invalidHoursErrorMessage()}</small> : null
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Dia</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        value={day}
                                        onChange={ (e) => setDay(e.target.value)}>
                                            {optionDays}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group>
                                    <Form.Label>Aula</Form.Label>
                                    <Form.Control className="form-control"
                                        as="select"
                                        value={classroom}
                                        onChange={ (e) => setClassroom(e.target.value)}
                                        required>
                                            {aulasOptions.map( (aula) => <option key={aula.id}>{aula}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <button type="button" 
                                    className="btn btn-danger color-button" 
                                    onClick={ () => onHideEdit()}
                                    style={{marginRight: "5px"}}>
                                        Cerrar
                            </button>
                            <button type="submit" className="btn btn-danger color-button">Modificar schedule</button>
                        </Row> 
                    </Container>
                </Form>
            </Modal.Body>
                            
        </Modal>
    )
}
