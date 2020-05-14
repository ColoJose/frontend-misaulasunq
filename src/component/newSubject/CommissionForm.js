import React, { useState } from 'react';
import {Button, Form, ListGroup, Card} from 'react-bootstrap';
import './CommissionForm.css';
import ScheduleForm from './ScheduleForm';
import ScheduleItem from './ScheduleItem';

// note: sch as schedule

export default function CommissionForm() {
    // modal logic
    const [showModalSchedule,setShowModalSchedule] = useState(false);
    const closeModalSchedule = ()=>{ setShowModalSchedule(false); }
    const openCloseModal = () => { setShowModalSchedule(true); }
    // schedule logic
    const [schedules, setSchedules] = useState([]);
    const addSchedule = (newSchedule) => {
        setSchedules([...schedules,newSchedule]);
    }
    const deleteSchedule = (id) => {
        let indexSchDelete = allIds().indexOf(id)
        schedules.splice(indexSchDelete,1)
    }

    
    // aux functions
    const allIds = () => { return schedules.map(schedule => schedule.id)};

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre comisión</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Año</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Semestre</Form.Label>
                    <Form.Control as="select">
                        <option>1er cuatrimestre</option>
                        <option>2do cuatrimestre</option>
                    </Form.Control>
                </Form.Group>

                <Button onClick={ () => openCloseModal()}>Agregar schedule</Button>
                <Button className="commissionButton">Agregar commisión</Button>
                <ScheduleForm show={showModalSchedule} 
                              onHide={closeModalSchedule}
                              addSchedule={addSchedule}
                              
                />
            </Form>
            <Card>
                <Card.Header>Schedules agregados</Card.Header>
                <ListGroup>
                    { schedules.length == 0 ?
                        <ListGroup.Item>No ha agregado schedules aún</ListGroup.Item>
                        :
                        schedules.map( function(sch){
                            return <ScheduleItem schedule={sch} 
                                                 deleteSchedule={deleteSchedule} />
                        })
                    }
                    
                </ListGroup>
            </Card>
            
        </>
    )
}