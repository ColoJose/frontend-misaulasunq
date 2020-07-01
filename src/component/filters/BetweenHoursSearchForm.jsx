import React from 'react';
// Bootstrap
import { FormGroup, Form, Col } from "react-bootstrap";
// Own Components
import SubmitSearchButton from "./SubmitSearchButton";
//React-Select
import Select from 'react-select';

const BetweenHoursSearchForm = ({ labelSelectOne, labelSelectTwo, submitHandler, startValue, setStartValue, endValue, setEndValue, optionsHours, searchType, error }) => {

    const renderLabel = (label) => {
        if(label){
            return <Form.Label as="h6">{label}</Form.Label>;
        }
    }

    const selectTheme = error => theme => {
        const errorStyling = error ? {
                                primary: "#dc3545",//"red",
                                neutral10: "#dc3545",//"red",
                                neutral30: "#dc3545",//"red",
                                neutral20: "#dc3545",//"red",
                                neutral60: "#dc3545",//"red",
                            } : {};

        return ({
            ...theme,
            colors: {
                ...theme.colors,
                ...errorStyling,
            },
        });
    };

    const handleStartHourChange = (selectedOption) =>{
        setStartValue(selectedOption);
    }

    const handleEndHourChange = (selectedOption) =>{
        setEndValue(selectedOption);
    }

    const renderErrorLabel = (hasError) =>{
        if(hasError){
            return <i class="text-danger">La hora "Desde" debe ser mayor que la hora "Hasta".</i>;
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
                                theme={selectTheme(error)}
                                maxMenuHeight={150}
                                defaultValue={optionsHours[0]}
                                name="Desde"
                                options={optionsHours}
                                value={startValue}
                                onChange = {handleStartHourChange}/>
                    </Col>
                    <Col xs={2}/>
                    <Col xs={4}>
                        <Select className="basic-single"
                                classNamePrefix="select"
                                theme={selectTheme(error)}
                                maxMenuHeight={150}
                                defaultValue={optionsHours[0]}
                                name="Hasta"
                                options={optionsHours}
                                value={endValue}
                                onChange = {handleEndHourChange}/>
                    </Col>
                    <Col xs={2}>
                        <SubmitSearchButton/>
                    </Col>
                    {renderErrorLabel(error)}
                </Form.Row>
            </FormGroup>
        </Form>
    );
}

export default BetweenHoursSearchForm;