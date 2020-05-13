import React from 'react';
import {Button, Form} from 'react-bootstrap';
import './CommissionForm.css';

export default function CommissionForm() {
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
                    <Form.Control type="number"/>
                </Form.Group>

                <Button>Agregar schedule</Button>
                <Button className="commissionButton">Agregar commisión</Button>
            </Form>
        </>
    )
}