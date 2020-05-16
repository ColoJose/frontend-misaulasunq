import React, { useState, useEffect } from 'react';
import {Button, Form, ListGroup, Card, Row, Col} from 'react-bootstrap';
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
    const [semester, setSemester] = useState('1er cuatrimestre');
    
    const commission = {
        name:name,
        year:year,
        semester:semester,
        schedules:schedules
    }
    // esto va con la validacion del schedule
    const [scheduleErrorVisbility, setScheduleErrorVisbility] = useState('hidden');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(schedules.length === 0) {
            
            // validate minimo un schedule
            
            return;
        }
        addCommission(commission);
        return;
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
            <form data-toggle="validator" role="form" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={8}><h2>Comisiones</h2></Col>    
                    <Col xs={4}><Button className="btn btn-danger"  type="submit">Agregar commisión</Button></Col>    
                </Row>
                
                
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
                        onChange={(e) => setYear(e.target.value)}
                        required />
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
            </form>

            {/* schedule section */}

            <h3>Schedules</h3>

            <Card>
                <Card.Header>Schedules agregados</Card.Header>
                <ListGroup>
                    { schedules.length === 0 ?
                        <ListGroup.Item>
                            <p>
                                No ha agregado schedules aún
                                <span hide style={{color:'red', visibility:scheduleErrorVisbility}}>Debe agregar al menos un schedule</span>
                            </p>
                            
                        </ListGroup.Item>

                        :
                        schedules.map( function(sch){
                            return <ScheduleItem schedule={sch} 
                                                 deleteSchedule={deleteSchedule}
                                                 modifySchedule={modifySchedule} />
                        })
                    }
                    
                </ListGroup>
            </Card>

            <Button className="btn btn-danger" onClick={ () => openCloseModal()}>Agregar schedule</Button>
            <ScheduleForm show={showModalSchedule} 
                            onHide={closeModalSchedule}
                            addSchedule={addSchedule}
                            
            />

        </>
    )
}