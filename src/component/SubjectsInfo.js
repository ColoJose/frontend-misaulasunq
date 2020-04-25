

import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import MapIcon from '../resources/mapIcon.png'; /// agregar icono
import Axios from 'axios';

function SubjectsInfo({subjects}) {
    // let subjectsAux= undefined;

    // useEffect( () => {
        
    //     if(subjects !== undefined){
            
    //         subjectsAux = subjects
    //         console.log(subjectsAux);
    //     }
    // })

    return (

        <div>
            {subjects !== undefined ? 
                        ( subjects.map( subject => {
                            return(
                            <ListGroup>
                                <ListGroup.Item>Materia: {subject.name}</ListGroup.Item>
                                <ListGroup.Item>Aula</ListGroup.Item>
                                <ListGroup.Item>Comisión</ListGroup.Item>
                                <ListGroup.Item>Horario </ListGroup.Item>
                                <ListGroup.Item><img  src={MapIcon}/></ListGroup.Item>
                        </ListGroup>) }))
                        
                    :

                (<p>Loading</p>) 


                    

            }
        </div>


    )
}


export default SubjectsInfo;