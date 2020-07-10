
import React from 'react';
import { Button, Card, ListGroup, Form } from 'react-bootstrap';
// css
import "./ButtonBranding.css";
import "./HeaderBranding.css";

function TodoList(){

    return (
        <>
            <Card className="border">
                <Card.Header className="header-branding">To-do list</Card.Header>
                <Card.Body className="px-0 py-0">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Corregir solapado entre Matemática  II e Historia General" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Hablar con Alejandra Blanco por aula 52" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Corregir solapado entre Matemática  II e Historia General" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Corregir solapado entre Análisis I y Programación concurrente" />
                            </Form.Group>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Agendar reunión con Zinni (CyT)" />
                            </Form.Group>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Button className="color-button"
                            disabled>
                        Agregar Nueva Tarea
                    </Button>
                </Card.Footer> 
            </Card>
        </>
    )
}

export default TodoList;