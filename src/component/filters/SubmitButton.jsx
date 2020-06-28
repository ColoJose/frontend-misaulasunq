import React from 'react';
// react-icons
import { MdSearch } from "react-icons/md";
// Bootstrap
import { Button } from "react-bootstrap";

const SubmitButton = () => {

    return (
        <Button type="submit" variant="light">
            <MdSearch size="1.75em"/>
        </Button>
    );
}

export default SubmitButton;