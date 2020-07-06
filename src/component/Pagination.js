import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import './Pagination.css';
// React-Icons
import { MdNavigateBefore, MdNavigateNext, MdFirstPage, MdLastPage } from "react-icons/md";

 const Pagination = (props) => {

    const handleNextPage    = () => {   callParentPageFunction(props.pageNumber + 1);   }
    const handlePreviousPage= () => {   callParentPageFunction(props.pageNumber - 1);   }
    const handleFirstPage   = () => {   callParentPageFunction(0);  }
    const handleLastPage    = () => {   callParentPageFunction(props.totalPages - 1);   }
    const onlyOnePage       = () => {   return props.totalPages === 1;  }
    const callParentPageFunction = (pageNumber) => {
        props.pageFunction(pageNumber);
    }

    return (
        <Row className="w-50 my-auto mx-auto">
            <Col xs={4} className="w-50 my-auto mx-auto">
                <Button variant="light"
                        onClick={ () => handleFirstPage() }
                        hidden={props.firstPage} >
                    <MdFirstPage size='2em'/>
                </Button> 
                <Button variant="light"
                        onClick={ () => handlePreviousPage() }
                        hidden={props.firstPage} >
                    <MdNavigateBefore size='2em'/>
                </Button> 
            </Col>
            <Col xs={2} className="w-50 my-auto mx-auto text-center pageNumber">
                <p hidden={onlyOnePage()}>{props.pageNumber + 1}</p>
            </Col>
            <Col xs={4} className="w-50 my-auto mx-auto">
                <Button variant="light"
                        onClick={ () => handleNextPage() }
                        hidden={props.lastPage}>
                    <MdNavigateNext size='2em'/>
                </Button>
                <Button variant="light"
                        onClick={ () => handleLastPage() }
                        hidden={props.lastPage}>
                    <MdLastPage size='2em'/>
                </Button>
            </Col>
        </Row>
    )
}

export default Pagination;