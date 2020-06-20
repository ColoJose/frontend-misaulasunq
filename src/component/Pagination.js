import React, {useState} from 'react';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import './Pagination.css';
import arrow from '../resources/arrow.png';

 const Pagination = ({pageNumber, nextPageIsEmpty, getAllSubjects}) => {
     
    const [leftArrowVisibility, setLeftArrowVisibility] = useState("hidden");
    const [rightArrowVisibility, setRightArrowVisibility] = useState("visible");

    return (
            <Row>
                <Col xs={5}/>
                <Row xs={2}>
                <Col className="leftArrow" class xs={4}>
                    <Button type="submit"
                            variant="outline-light">
                        <Image src={arrow}/>
                    </Button>
                </Col>
                <Col className="center" xs={4}>
                    <p>1</p>
                </Col>
                <Col xs={4}>
                    <Button className="rightArrow"
                            variant="outline-light"
                            onClick={ () => getAllSubjects() }>
                        <Image src={arrow}/>
                    </Button>
                </Col>
                </Row>
                <Col xs={5}/>
            </Row>
    )
}

export default Pagination;