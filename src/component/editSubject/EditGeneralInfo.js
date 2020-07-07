import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../ButtonBranding.css';
import { isSubjectCodeRepeated } from '../../utils/formValidator.js';
import SubjectAPI from "../../Api/SubjectAPI";

 const EditGeneralInfo = (props) => {

   const {subject, show, hide, selectSubjectTo, handleEditButtons, idEditButton} = props;

   const [name, setName] = useState(subject.name);
   const [subjectCode, setSubjectCode] = useState(subject.subjectCode);
   const subjectCodeGiven = subject.subjectCode

   const subjectApi = new SubjectAPI();
   const [subjectCodes, setSubjectCodes] = useState();

   useEffect(() => {
      subjectApi.getAllSubjectCodes().then( (resp) => {
         setSubjectCodes(resp.data);
      }).catch( e => console.log(e));

   }, []);

   const generalInfoToPost = {
      name,
      subjectCode
   }
   const handleSubmit = (e) => {
      e.preventDefault();
      validateFieldsAndSendReq();
   }

   const validateFieldsAndSendReq = () => {
      console.log(subjectCodes); 
      if(isSubjectCodeRepeated(subjectCode, subjectCodes, subjectCodeGiven)) {
         document.getElementById("subject-code-id").style.border = "1px solid red";
         document.getElementById("subject-code-error").style.visibility = "visible";
         return;
      }else {
         selectSubjectTo(subject,"generalInfo",generalInfoToPost);
         handleEditButtons(idEditButton);
         cleanForm()
         hide();
      }
   }

   const cleanForm = () => {
      document.getElementById("subject-code-id").style.border = "1px solid red";
      document.getElementById("subject-code-error").style.visibility = "hidden";
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
                           id="subject-code-id"
                           type="text"
                           value={subjectCode}
                           onChange={ (e) => setSubjectCode(e.target.value)}
                           required />
                        <small id="subject-code-error" style={{visibility:"hidden",color:"red"}}>El código ingresado está repetido</small>
                     </Form.Group>
                  
               </Modal.Body>
               <Modal.Footer>
                  <Button className="color-button" type="submit">Guardar cambios</Button>
                  <Button className="color-button" onClick={ () =>  handleClose() }>Cerrar</Button>
               </Modal.Footer>
            </Form>
         </Modal>
)
}

export default EditGeneralInfo;