

import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import MapIcon from '../resources/mapIcon.png'; /// agregar icono
import Axios from 'axios';

function SubjectsInfo() {

    const [data,setData] = React.useState({res : []});

    useEffect( async() => {
        const result = await Axios(
            "http://www.mocky.io/v2/5e9a6ea2330000b7c77b3011"
        ).then( (res) => { console.log(res.data)})
    })

    return (
        <div>
            <ListGroup horizontal>
                <ListGroup.Item>Materia</ListGroup.Item>
                <ListGroup.Item>Aula</ListGroup.Item>
                <ListGroup.Item>Comisión</ListGroup.Item>
                <ListGroup.Item>Horario </ListGroup.Item>
                <ListGroup.Item><img  src={MapIcon}/></ListGroup.Item>
            </ListGroup>
        </div>
    )
}


export default SubjectsInfo;