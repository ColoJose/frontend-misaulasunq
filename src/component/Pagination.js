import React, {useState} from 'react';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import './Pagination.css';
import arrow from '../resources/arrow.png';

 const Pagination = ({pageNumber, sizeContent, getAllSubjects}) => {
     
    const [leftArrowVisibility, setLeftArrowVisibility] = useState(false);
    const [rightArrowVisibility, setRightArrowVisibility] = useState(true);

    const handleArrows = () => {
        handleLeftArrow();
        handleRightArrow();
    }

    const handleArrowsR = () => {
        getAllSubjects(pageNumber + 1);
        handleArrows();
    }

    const handleArrowsL = () => {
        getAllSubjects(pageNumber - 1);
        handleArrows();
    }

    const handleLeftArrow = () => {  
        pageNumber===0 ? changeArrowVisibility("leftArrow","hidden") : changeArrowVisibility("leftArrow","visible"); 
    }

    const handleRightArrow = () => {
        sizeContent === 5 ? 
            changeArrowVisibility("rightArrow","visible")
            :
            changeArrowVisibility("rightArrow","hidden"); 
    }

    const changeArrowVisibility = (arrowId,visibility) => { 
        document.getElementById(arrowId).style.visibility = visibility;
    }

    return (
            <Row>
                <Col xs={5}/>
                <Row xs={2}>
                <Col id="leftArrow" class xs={4}>
                        <Button type="submit"
                                variant="outline-light"
                                onClick={ () => handleArrowsL() } >
                            <Image src={arrow}/>
                        </Button> 
                </Col>
                <Col className="center" xs={4}>
                    <p>&nbsp;&nbsp;&nbsp;{pageNumber + 1}</p>
                </Col>
                <Col xs={4}>
                    { rightArrowVisibility ? 
                        <Button id="rightArrow"
                            variant="outline-light"
                            onClick={ () => handleArrowsR() }>
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