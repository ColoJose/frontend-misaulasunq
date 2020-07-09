import React from "react";
// react-icons
import { BsExclamationTriangleFill } from 'react-icons/bs';
//Bootstrap
import { Badge } from "react-bootstrap";
// CSS
import "./NotFound.css";

const NotFound = ({label}) =>(
    <>
        <Badge className="branding align-middle text-center text-wrap flex-fill"
               variant="danger"
               pill>
            <BsExclamationTriangleFill size='3rem'
                                       className="my-2"/>
            <p>{label}</p>
        </Badge>
    </>
)

export default NotFound;