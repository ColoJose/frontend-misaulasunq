import React from 'react';
// Bootstrap
import { Form, Col } from "react-bootstrap";
//React-Select
import Select from 'react-select';
// CSS
import "./Filters.css";

const BetweenHoursSearchForm = ({ labelSelectOne, labelSelectTwo, startValue, handleHoursSet, endValue, optionsHours, searchType, error }) => {

    const renderLabel = (label) => {
        if(label){
            return <Form.Label className="filter-subtitle mb-0">{label}</Form.Label>;
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
        handleHoursSet(selectedOption, endValue, searchType);
    }

    const handleEndHourChange = (selectedOption) =>{
        handleHoursSet(startValue, selectedOption,searchType);
    }

    const renderErrorLabel = (hasError) =>{
        if(hasError){
            return <i class="text-danger">La hora "Desde" debe ser mayor que la hora "Hasta" y deben estar seleccionadas.</i>;
        }
    }

    return (
        <Form.Row>
            <Col xs={5}>
                {renderLabel(labelSelectOne)}
            </Col>
            <Col xs={2}/>
            <Col xs={5}>
                {renderLabel(labelSelectTwo)}
            </Col>
            <Col xs={5}>
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
            <Col xs={5}>
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
            {renderErrorLabel(error)}
        </Form.Row>
    );
}

export default BetweenHoursSearchForm;