
import React from 'react';
import { Popover, Badge, Card, ListGroup, Col, Row } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';
// react-icons
import { BsExclamationTriangleFill } from 'react-icons/bs';
import OverlayMenu from './OverlayMenu';

function OverlapList(){

    
    const editPopover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">¿Qué va a editar?</Popover.Title>
          <Popover.Content >Editar info general</Popover.Content>
          <Popover.Content >Editar comisiones</Popover.Content>
        </Popover>
    );
    
    return (
        <>
            <Card autoCapitalize className="border">
                <Card.Header style={{backgroundColor: '#832d1c', fontWeight: '500', color:'#fff'}}>Materias Superpuestas</Card.Header>
                <Card.Body className="px-0 py-0">
                    
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={2}>
                                    <OverlayMenu popover={editPopover}/>
                                </Col>
                                <Col xs={10}>
                                    <Row>
                                        <Col xs={10}>
                                            Matematica II<br/>Tecnicatura en Programacion
                                        </Col>
                                        <Col xs={2}>
                                        <Badge basic circular>
                                            <BsExclamationTriangleFill color='#ffc107' size='1.5em'/>
                                            <Label circular 
                                                   floating 
                                                   style={{backgroundColor:"#832d1c",color:"#fff", top: "-25%",left: "85%"}}>
                                                22
                                            </Label>
                                        </Badge>                                        
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default OverlapList;