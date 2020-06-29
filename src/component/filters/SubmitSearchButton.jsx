import React from 'react';
// react-icons
import { MdSearch } from "react-icons/md";
// Bootstrap
import { Button } from "react-bootstrap";

const SubmitSearchButton = () => {

    return (
        <Button type="submit" variant="light">
            <MdSearch size="1.75em"/>
        </Button>
    );
}

export default SubmitSearchButton;