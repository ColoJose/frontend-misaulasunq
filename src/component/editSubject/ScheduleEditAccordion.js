import React from 'react';
import { Accordion } from 'react-bootstrap';
import ScheduleEditItem from './ScheduleEditItem';


 const ScheduleEditAccordion = ({schedules}) => {
    
    return (
            <div>
                { schedules===undefined ? <p>cargando...</p> 
                                        :
                                        <Accordion defaultActiveKey="0">
                                        {schedules.map (schedule => {
                                            return <ScheduleEditItem key={schedule.id}
                                                                     schedule={schedule} />
                                        })}
                                        </Accordion>
                }
            </div>
            
        )
}

export default ScheduleEditAccordion;