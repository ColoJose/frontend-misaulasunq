import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export default function ScheduleForm() {

    const [show, setShow] = useState(false);

    const handleShow = () => {setShow(true)}
    const handleHide = () => {setShow(false)}
    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header>Nuevo schedule</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button>Cerrar</Button>
                <Button>Agregar schedule</Button>
            </Modal.Footer>
        </Modal>
    )
}