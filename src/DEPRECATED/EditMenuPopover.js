import React from 'react';
//Bootstrap
import { Popover } from 'react-bootstrap';
import history from '../../utils/history';

const EditMenuPopover = (props) =>{

    const goEditCommissions = () => { 
        history.push(`/admin/edit-commissions/${props.subjectId}`); 
    }

    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">¿Qué va a editar?</Popover.Title>
            <Popover.Content onClick={ () => goEditCommissions() }>Editar comisiones</Popover.Content>
        </Popover>
    );
}

export default EditMenuPopover;