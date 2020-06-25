import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

 const EditGeneralInfo = (props) => {

   const {subject, show, hide, selectSubjectTo, handleEditButtons, idEditButton} = props;

   const [name, setName] = useState(subject.name);
   const [subjectCode, setSubjectCode] = useState(subject.subjectCode);

   const generalInfoToPost = {
      name,
      subjectCode
   }
   const handleSubmit = (e) => {
      e.preventDefault(); 
      selectSubjectTo(subject,"generalInfo",generalInfoToPost);
      console.log("pass select subject2");
      handleEditButtons(idEditButton);
      hide();
   }

   const handleClose = () => { 
      handleEditButtons(idEditButton);
      hide()
   }
   
   return (
         <Modal show={show}>
            <Modal.Header>
               <Modal.Title>Editar información general</Modal.Title>
            </Modal.Header>   
            <Form onSubmit={handleSubmit}>
               <Modal.Body>
                     <Form.Group>
                        <Form.Label>Nombre materia</Form.Label>
                        <Form.Control
                           type="text"
                           value={name}
                           onChange={ (e) => setName(e.target.value)}
                           required />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Código materia</Form.Label>
                        <Form.Control 
                           type="text"
                           value={subjectCode}
                           onChange={ (e) => setSubjectCode(e.target.value)}
                           required />
                     </Form.Group>
                  
               </Modal.Body>
               <Modal.Footer>
                  <Button type="submit">Guardar cambios</Button>
                  <Button onClick={ () =>  handleClose() }>Cerrar</Button>
               </Modal.Footer>
            </Form>
         </Modal>
)
}

export default EditGeneralInfo;