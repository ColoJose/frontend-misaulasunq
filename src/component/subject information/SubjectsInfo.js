import React from 'react';

import SubjectsAccordion from './SubjectsAccordion';
import CurrentDaySubjects from './CurrentDaySubjects';

function SubjectsInfo({subjects}) {
    //TODO: Tiene que ser una pantalla de de carga y/o sin resultados pero en el componente padre
    if(subjects !== undefined){
        return (
            <>
                {
                    subjects.map( 
                        subject => {
                            return <SubjectsAccordion subject={subject}/>
                        }
                    )
                }
            </>
        );
    } else {
        return <CurrentDaySubjects />;
    }
    
}

export default SubjectsInfo;