import React, { useState } from 'react';
import {Modal, Form} from 'react-bootstrap';

const days = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const optionDays = days.map( (day) => <option>{day}</option>)
const hours = Object.freeze([
    "07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
]);

let optionsHours = 
            hours.map( (hs) => <option key={hs.toString()}>{hs}</option>);

export default function ScheduleForm({show, onHide, addSchedule}) {


    const [startTime,setStartTime] = useState(optionsHours[0].key);
    const [endTime,setEndTime] = useState(optionsHours[0].key);
    const [day, setDay] = useState(days[0]);
    const [aula,setAula] = useState(null);

    const schedule = {
        startTime,
        endTime,
        classroom: {number:aula,imageUrl:"foo"},
        day,
    };

    const cleanUp = () => {
        setStartTime(optionsHours[0].key);
        setEndTime(optionsHours[0].key);
        setDay(days[0]);
        setAula('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addSchedule(schedule);
        cleanUp();
        return onHide();
    }

    // const handleSubmitModify = () => {
        // TODO
    // }

    return (
        <Modal show={show} >
            <Modal.Header>Nuevo schedule</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} data-toggle="validator" role="form">
                    <Form.Group>
                        <Form.Label>Hora comienzo</Form.Label>
                        <Form.Control 
                            as="select"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}>
                                {optionsHours}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hora fin</Form.Label>
                        <Form.Control 
                            as="select"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}>
                                {optionsHours}
                        </Form.Control>
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
                        <input className="form-control"
                            value={aula}
                            onChange={ (e) => setAula(e.target.value)}
                            required
                            />
                    </Form.Group>

                    <button type="button" className="btn btn-info" onClick={ () => onHide()}>Cerrar</button>
                    <button type="submit" className="btn btn-info">Agregar schedule</button> 
                </Form>
            </Modal.Body>
        </Modal>
    )
}
