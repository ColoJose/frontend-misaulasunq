import React from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import './Pagination.css';
import left from '../resources/arrowLeft.png';
import right from '../resources/arrowRight.png';

 const Pagination = (props) => {

    const handleArrowsR = () => {
        props.nextPageFunction(props.pageNumber + 1);
    }

    const handleArrowsL = () => {
        props.nextPageFunction(props.pageNumber - 1);
    }

    return (
        <Row className="my-auto mx-auto">
            <Col xs={4} className="my-auto mx-auto">
                <Button variant="outline-light"
                        onClick={ () => handleArrowsL() }
                        disabled={props.firstPage} >
                    <Image src={left}/>
                </Button> 
            </Col>
            <Col xs={4} className="my-auto mx-auto text-center pageNumber">
                <p>{props.pageNumber + 1}</p>
            </Col>
            <Col xs={4} className="my-auto mx-auto">
                <Button variant="outline-light"
                        onClick={ () => handleArrowsR() }
                        disabled={props.lastPage}>
                    <Image src={right}/>
                </Button>
            </Col>
        </Row>
    )
}

export default Pagination;