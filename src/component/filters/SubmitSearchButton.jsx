import React from 'react';
// react-icons
import { MdSearch } from "react-icons/md";
// Bootstrap
import { Button } from "react-bootstrap";

const SubmitSearchButton = ({label, block=false, className=""}) => {

    const renderLabel = (label) => {
        if(label){
            return label;
        }
    }

    return (
        <Button className={className}
                type="submit" 
                variant="light"
                block={block}>
            {renderLabel(label)}
            <MdSearch className="ml-3" size="1.65em"/>
        </Button>
    );
}

export default SubmitSearchButton;