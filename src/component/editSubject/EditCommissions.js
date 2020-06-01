import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

 const EditCommissions = (props) => {

   const {subject, show, hide, selectSubjectTo} = props;

   const handleSubmit = () => { 
      hide();
   }

    return (
         <>
            <Modal show={show}>
                <Modal.Header>Alohaaa!!</Modal.Header>
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>

                  </Modal.Body>
                  <Modal.Footer>
                     <Button  onClick={ () => hide() }>Cerrar</Button>
                     <Button type="submit">Guardar cambios</Button>
                  </Modal.Footer>
                </Form>
            </Modal>
         </>
)
}

export default EditCommissions;