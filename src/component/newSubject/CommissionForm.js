import React, { useState } from 'react';
import {Button, Form, ListGroup, Card} from 'react-bootstrap';
import './CommissionForm.css';
import ScheduleForm from './ScheduleForm';
import ScheduleItem from './ScheduleItem';

// note: sch as schedule

export default function CommissionForm({addCommission}) {
    // modal logic
    const [showModalSchedule,setShowModalSchedule] = useState(false);
    const closeModalSchedule = ()=>{ setShowModalSchedule(false); }
    const openCloseModal = () => { setShowModalSchedule(true); }

    // schedule logic
    const [schedules, setSchedules] = useState([]);
    const addSchedule = (newSchedule) => {
        setSchedules([...schedules,newSchedule]);
    }

    // VER
    const deleteSchedule = (id) => {
        let indexSchDelete = allIds().indexOf(id)
        schedules.splice(indexSchDelete,1)
    }

    // VER
    const modifySchedule = (schedule) => {
        openCloseModal();
        deleteSchedule(schedule.id);
        console.log(schedules);
    }

    // commission logic
    const [name,setName] = useState('');
    const [year,setYear] = useState(null);
    const [semester, setSemester] = useState();
    
    const commission = {
        name:name,
        year:year,
        semester:semester,
        schedules:schedules
    }

    const addCommissionHandle = () => {
        addCommission(commission);
        // cleanUp();  ver el tema del clean up
    }

    const cleanUp = () => {
            commission.name="clean";
            commission.year=null;
            commission.semester="";
            commission.schedules= [] ;

    }
    
    // aux functions
    const allIds = () => { return schedules.map(schedule => schedule.id)};

    return (
        <>
            <Form data-toggle="validator">
                <Form.Group>
                    <Form.Label>Nombre comisión</Form.Label>
                    <Form.Control 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Año</Form.Label>
                    <Form.Control 
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Semestre</Form.Label>
                    <Form.Control 
                        as="select"
                        value={semester}
                        onChange={ (e) => setSemester(e.target.value)} >
                        <option>1er cuatrimestre</option>
                        <option>2do cuatrimestre</option>
                    </Form.Control>
                </Form.Group>

                <Button onClick={ () => openCloseModal()}>Agregar schedule</Button>
                <ScheduleForm show={showModalSchedule} 
                              onHide={closeModalSchedule}
                              addSchedule={addSchedule}
                              
                />
            
            <Card>
                <Card.Header>Schedules agregados</Card.Header>
                <ListGroup>
                    { schedules.length === 0 ?
                        <ListGroup.Item>No ha agregado schedules aún</ListGroup.Item>
                        :
                        schedules.map( function(sch){
                            return <ScheduleItem schedule={sch} 
                                                 deleteSchedule={deleteSchedule}
                                                 modifySchedule={modifySchedule} />
                        })
                    }
                    
                </ListGroup>
            </Card>
            <Button className="commissionButton"
                        onClick={ () => addCommissionHandle()}>Agregar commisión</Button>
            </Form>
        </>
    )
}