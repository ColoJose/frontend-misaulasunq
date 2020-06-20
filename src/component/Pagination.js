import React, {useState} from 'react';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import './Pagination.css';
import arrow from '../resources/arrow.png';

 const Pagination = ({pageNumber, nextPageIsEmpty, getAllSubjects}) => {
     
    const [leftArrowVisibility, setLeftArrowVisibility] = useState(false);
    const [rightArrowVisibility, setRightArrowVisibility] = useState(true);

    const handleArrows = () => {
        getAllSubjects();
        handleLeftArrow();
        handleRightArrow();
    }
    
    const handleLeftArrow = () => { pageNumber===0 ? setLeftArrowVisibility(false) : setLeftArrowVisibility(true); }
    const handleRightArrow = () => { nextPageIsEmpty ? setRightArrowVisibility(true) : setLeftArrowVisibility(false); }

    return (
            <Row>
                <Col xs={5}/>
                <Row xs={2}>
                <Col className="leftArrow" class xs={4}>
                    { leftArrowVisibility ?     
                        <Button type="submit"
                                variant="outline-light">
                                onClick={ () => {handleArrows()}}
                            <Image src={arrow}/>
                        </Button> 
                        :
                        null
                    }
                </Col>
                <Col className="center" xs={4}>
                    <p>{pageNumber + 1}</p>
                </Col>
                <Col xs={4}>
                    { rightArrowVisibility ? 
                        <Button className="rightArrow"
                            variant="outline-light"
                            onClick={ () => handleArrows() }>
                                <Image src={arrow}/>
                        </Button>
                        :
                        null
                    }
                    
                </Col>
                </Row>
                <Col xs={5}/>
            </Row>
    )
}

export default Pagination;