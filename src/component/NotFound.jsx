import React from "react";
// react-icons
import { BsExclamationTriangleFill } from 'react-icons/bs';
//Bootstrap
import { Badge } from "react-bootstrap";
// CSS
import "./Home.css";

const NotFound = ({label}) =>(
    <>
        <Badge pill variant="danger" className="align-middle text-center text-wrap">
            <BsExclamationTriangleFill size='12.5%' 
                                       className="icon-NotFound"/>
            <p>{label}</p>
        </Badge>
    </>
)

export default NotFound;