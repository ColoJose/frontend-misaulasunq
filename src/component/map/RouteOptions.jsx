import React from 'react';
// bootstrap
import { Form, Col } from 'react-bootstrap';
// css
import './Map.css';
import "../ButtonBranding.css";

const RouteOptions = ({parkingRouteUnavailable, parkingChecked, routeStartingAtParking, mainRouteUnavailable, mainChecked, routeStartingAtMain}) => {

    return (
        <Col className="d-inline-flex justify-content-center
                        d-sm-inline-flex flex-sm-row 
                        d-md-inline-flex flex-md-row
                        d-lg-flex flex-lg-column 
                        d-xl-flex flex-xl-column">
            <Form.Check type="radio"
                        className="pl-0 pr-3 px-lg-0 px-xl-0 "
                        label="Estacionamiento"
                        name="Estacionamiento"
                        disabled={parkingRouteUnavailable}
                        checked={parkingChecked}
                        onChange={routeStartingAtParking}/>
            <Form.Check type="radio"
                        className="pl-3 pr-0 px-lg-0 px-xl-0 "
                        label="Entrada Principal"
                        name="Entrada Principal"
                        disabled={mainRouteUnavailable}
                        checked={mainChecked}
                        onChange={routeStartingAtMain}/>
        </Col>
        );
}

export default RouteOptions;