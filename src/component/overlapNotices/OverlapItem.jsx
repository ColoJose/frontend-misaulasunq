
import React from 'react';
//Bootstrap
import { Popover, Button, OverlayTrigger, ListGroup, Col, Row, Badge } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';
// react-icons
import { BsExclamationTriangleFill,BsList } from 'react-icons/bs';
import history from '../../utils/history';

const OverlapItem = ({subject}) =>{

    const editPopover = (<Popover id="popover-basic">
            <Popover.Title><h4>¿Qué va a editar?</h4></Popover.Title>
            <Popover.Content onClick={ () => goEditCommissions() }>Editar comisiones</Popover.Content>
        </Popover>);

    const goEditCommissions = () => { 
        history.push(`/admin/edit-commissions/${subject.id}`); 
    }

    const countOverlapNotices = () =>{
        return subject.commissions.reduce(
            function (accumulator, currentValue) {
                return accumulator + 
                    currentValue.schedules.reduce(
                        function (accumulator, currentValue) {
                            return accumulator + currentValue.notices.length;
                        },
                        0
                    );
            },
            0
        );
    }

    return (<ListGroup.Item>
                <Row>
                    <Col xs={2}>    
                    <OverlayTrigger trigger="click" placement="right" overlay={editPopover}>
                        <Button variant="light">
                            <BsList size='1em'/>
                        </Button>
                    </OverlayTrigger>
                    </Col>
                    <Col xs={10}>
                        <Row>
                            <Col xs={10}>
                                {subject.name}
                            </Col>
                            <Col xs={2}>
                            <Badge basic circular>
                                <BsExclamationTriangleFill color='#ffc107' size='1.5em'/>
                                <Label circular 
                                        floating 
                                        style={{backgroundColor:"#832d1c",color:"#fff", top: "-25%",left: "85%"}}>
                                    {countOverlapNotices()}
                                </Label>
                            </Badge>                                        
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>);
}
export default OverlapItem;