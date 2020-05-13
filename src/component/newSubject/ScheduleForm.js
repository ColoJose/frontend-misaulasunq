import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export default function ScheduleForm({show, onHide}) {

    console.log(show);
    return (
        <Modal show={show} >
            <Modal.Header>Nuevo schedule</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Hora comienzo</Form.Label>
                        <Form.Control type="number"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hora fin</Form.Label>
                        <Form.Control type="number"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dia</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Aula</Form.Label>
                        <Form.Control type="number"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cerrar</Button>
                <Button onClick={onHide}>Agregar schedule</Button>
            </Modal.Footer>
        </Modal>
    )
}