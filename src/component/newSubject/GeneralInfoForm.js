import React from 'react';
import { Form, ListGroup, Card } from 'react-bootstrap';


export default function GeneralInfoForm() {

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Carrera a la que pertenece</Form.Label>
                    <Form.Control as="select" value="Elegir...">
                        <option>tpi</option>
                        <option>biotecnologia</option>
                        {/* TODO: que devuelva todas las materias */}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nombre materia</Form.Label>
                    <Form.Control />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Código materia</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Card>
                    <Card.Header>Comisiones agregadas</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>comision 1</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Form>
        </>
    )
}