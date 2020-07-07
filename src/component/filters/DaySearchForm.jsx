import React from 'react';
// Bootstrap
import { Form, Col } from "react-bootstrap";
import Select from 'react-select';

const DaySearchForm = ({label, onInputChangeHandler, selectOptions, searchType, error}) => {
    
    const renderErrorLabel = (hasError) =>{
        if(hasError){
            return <i class="text-danger">Debe Seleccionar un Día.</i>;
        }
    }

    const options = (e) => {
        onInputChangeHandler(e.value,searchType);
    }

    const renderLabel = () => {
        if(label){
            return <Form.Label as="h6">{label}</Form.Label>;
        }
    }

    return(
        <Form.Row>
            {renderLabel()}
            <Col xs={12}>
                <Select className="basic-single"
                        classNamePrefix="select"
                        maxMenuHeight={150}
                        defaultValue={selectOptions[0]}
                        name="Dia"
                        options={selectOptions}
                        onChange = { (e) => options(e)}/>
            </Col>
            {renderErrorLabel(error)}
        </Form.Row>
    );
}

export default DaySearchForm;