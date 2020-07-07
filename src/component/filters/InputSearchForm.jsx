import React from 'react';
// Bootstrap
import { Form, Col } from "react-bootstrap";
import "./SelectOptions.css";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const InputSearchForm = ({label, submitHandler, placeHolder, onInputChangeHandler, suggestions, dataListId, searchType}) => {
    
    const handleChange = (event) => {
        let value = '';
        if(Array.isArray(event) && event.length){
            value = event[0];
        }
        onInputChangeHandler(value,searchType);
    }
    
    const renderLabel = () => {
        if(label){
            return <Form.Label as="h6">{label}</Form.Label>;
        }
    }

    return (
        <Form.Row>
            {renderLabel()}
            <Col xs={12}>
                <Typeahead id="basic-typeahead-single"
                            className="height-Custom"
                            onInputChange={(e) => onInputChangeHandler(e,searchType)}
                            onChange={(e) => handleChange(e)}
                            options={suggestions}
                            placeholder={placeHolder}
                            maxResults={8}/>
            </Col>
        </Form.Row>
    );
}

export default InputSearchForm;