import React, {useState} from 'react';
import {Accordion, Card, Button, ListGroup} from 'react-bootstrap';
import LocationIcon from '../resources/locationIcon.png';
import CommissionDialog from './CommissionDialog';
import './CommissionInfo.css';

function CommissionInfo({commissions}) {

    // show/hide commission dialog
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false)}
    const handleShow = () => { setShow(true) }

    let commissionDialogProps = {
        show: show,
        handleClose:handleClose,
    }

    return (
        <>
            {commissions.map( commission => {
                return (<>
                        <Accordion.Collapse className="container" key={commission.id.toString()}>
                            <ListGroup horizontal>
                                <ListGroup.Item>{commission.name}</ListGroup.Item>    
                                <ListGroup.Item><img src={LocationIcon}/></ListGroup.Item>
                                <Button variant="outline-danger" onClick={handleShow}>Más info</Button>
                            </ListGroup>
                        </Accordion.Collapse >
                        <CommissionDialog {...commissionDialogProps} commission={commission}/>
                        </>
                        )
                
            })}
            
        </>
    );
}

export default CommissionInfo;