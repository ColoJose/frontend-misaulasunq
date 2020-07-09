
import React from 'react';
import { Card, ListGroup, Form } from 'react-bootstrap';

function TodoList(){

    return (
        <>
            <Card className="border">
                <Card.Header style={{backgroundColor: '#832d1c', fontWeight: '500', color:'#fff'}}>To-do list</Card.Header>
                <Card.Body className="px-0 py-0">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Corregir solapado entre Matematica II e Historia General" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Hablar con Alejandra Blanco por aula 52" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Corregir solapdo entre Matematica II e Historia General" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Corregir solapdo entre Análisis I y Programación concurrente" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Agendar reunión con Zinni (cyt)" />
                            </Form.Group>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <p>Agregar nueva tarea</p>
                </Card.Footer> 
            </Card>
        </>
    )
}

export default TodoList;