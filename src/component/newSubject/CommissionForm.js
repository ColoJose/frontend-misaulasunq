import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import './CommissionForm.css';
import ScheduleForm from './ScheduleForm';

export default function CommissionForm() {

    const [showModalSchedule,setShowModalSchedule] = useState(false);
    //const showScheduleForm = () => { setShowScheduleModal(true)};

    const closeModalSchedule = ()=>{ setShowModalSchedule(false); }
    const openCloseModal = () => { setShowModalSchedule(true); }
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
                    <Form.Control />
                </Form.Group>

                <Button onClick={ () => openCloseModal()}>Agregar schedule</Button>
                <Button className="commissionButton">Agregar commisión</Button>
                <ScheduleForm show={showModalSchedule} 
                              onHide={closeModalSchedule} 
                />
            </Form>
        </>
    )
}