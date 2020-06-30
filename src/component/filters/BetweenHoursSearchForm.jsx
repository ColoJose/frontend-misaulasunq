import React from 'react';
// Bootstrap
import { FormGroup, Form, Col } from "react-bootstrap";
// Own Components
import SubmitSearchButton from "./SubmitSearchButton";
import Select from 'react-select';

const BetweenHoursSearchForm = ({labelSelectOne, labelSelectTwo, submitHandler, startValue, setStartValue, endValue, setEndValue, optionsHours, searchType}) => {

    const renderLabel = (label) => {
        if(label){
            return <Form.Label as="h6">{label}</Form.Label>;
        }
    }

    return (
        <Form onSubmit={(e) => submitHandler(e, searchType)}>
            <Form.Row className="mt-1">
                <Col xs={4}>
                    {renderLabel(labelSelectOne)}
                </Col>
                <Col xs={2}/>
                <Col xs={4}>
                    {renderLabel(labelSelectTwo)}
                </Col>
                <Col xs={2}/>
            </Form.Row>
            <FormGroup className="mb-1">
                <Form.Row>
                    <Col xs={4}>
                        <Select className="basic-single"
                                classNamePrefix="select"
                                maxMenuHeight={150}
                                defaultValue={optionsHours[0]}
                                name="Desde"
                                options={optionsHours}
                                onChange = { (e) => setStartValue(e.value)}/>
                    </Col>
                    <Col xs={2}/>
                    <Col xs={4}>
                        <Select className="basic-single"
                                classNamePrefix="select"
                                maxMenuHeight={150}
                                defaultValue={optionsHours[0]}
                                name="Hasta"
                                options={optionsHours}
                                onChange = { (e) => setEndValue(e.value)}/>
                    </Col>
                    <Col xs={2}>
                        <SubmitSearchButton/>
                    </Col>
                </Form.Row>
            </FormGroup>
        </Form>
    );
}

export default BetweenHoursSearchForm;