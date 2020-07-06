import React, { useState, useEffect, useRef } from 'react';
import {Modal, Form} from 'react-bootstrap';
import SubjectAPI from '../../Api/SubjectAPI';
import { areValidHours } from '../../utils/formValidator';
// css
import '../ButtonBranding.css';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

export default function ScheduleFormEdit({show, onHide, addSchedule}) {

    const subjectApi = new SubjectAPI();

    const [startTime,setStartTime] = useState(hours[0]);
    const [endTime,setEndTime] = useState(hours[0]);
    const [day, setDay] = useState(days[0]);
    const [aulasOptions, setAulasOptions] = useState([]);
    const [classroom,setClassroom] = useState();
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
            addSchedule(schedule);
            setHoursValidation(false);
            cleanUp();
            return onHide();            
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

    const cleanUp = () => {
        setStartTime(hours[0]);
        setEndTime(hours[0]);
        setDay(days[0]);
        setClassroom(aulasOptions[0]);
    }

    function invalidHoursErrorMessage() { return"La materia debe tener al menos dos horas de diferencia"}

    return (
        <Modal show={show} >
            <Modal.Header>Nuevo schedule</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} data-toggle="validator" role="form">
                    <Form.Group>
                        <Form.Label>Hora comienzo</Form.Label>
                        <Form.Control
                            className={"selectHours"}  
                            as="select"
                            value={startTime}
                            maxMenuHeight={150}
                            onChange={(e) => setStartTime(e.target.value)}>
                                {optionsHours}
                        </Form.Control>
                        {
                            hoursValidation ? <small style={{color:"red"}}>{invalidHoursErrorMessage()}</small> : null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hora fin</Form.Label>
                        <Form.Control
                            className={"selectHours"} 
                            as="select"
                            value={endTime}
                            maxMenuHeight={150}
                            onChange={(e) => setEndTime(e.target.value)}>
                                {optionsHours}    
                        </Form.Control>
                        {
                            hoursValidation ? <small style={{color:"red"}}>{invalidHoursErrorMessage()}</small> : null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dia</Form.Label>
                        <Form.Control 
                            as="select"
                            value={day}
                            onChange={ (e) => setDay(e.target.value)}>
                                {optionDays}
                        </Form.Control>
                    </Form.Group>
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

                    <button type="button" 
                            className="btn btn-danger color-button" 
                            onClick={ () => onHide()}
                            style={{marginRight: "5px"}}>
                                Cerrar
                    </button>
                    <button type="submit" className="btn btn-danger color-button">Agregar schedule</button> 

                </Form>
            </Modal.Body>
        </Modal>
    )
}
