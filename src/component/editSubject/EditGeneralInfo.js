import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

 const EditGeneralInfo = ({subject,show}) => {

   const [name, setName] = useState('nombre'); // subject.name
   const [subjectCode, setSubjectCode] = useState('comisiones'); // subject.commissions

    return (
         <Modal show={show}>
            <Modal.Header>
               <Modal.Title>Editar información general</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
               <Form>
                  <Form.Group>
                     <Form.Label>Nombre materia</Form.Label>
                     <Form.Control
                        type="text"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        required/>
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Código materia</Form.Label>
                     <Form.Control 
                        type="text"
                        value={subjectCode}
                        onChange={ (e) => setSubjectCode(e.target.value)}/>
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button>Guardar cambios</Button>
               <Button>Cerrar</Button>
            </Modal.Footer>
         </Modal>
)
}

export default EditGeneralInfo;