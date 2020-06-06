import React from 'react';
import { Accordion } from 'react-bootstrap';
import ScheduleEditItem from './ScheduleEditItem';


 const ScheduleEditAccordion = ({schedules, updateSchedules}) => {
    
    const updateSchedule = (id, field, value) => {
        schedules.map( (schedule => updateFieldSchedule(schedule, id, field, value)))
        updateSchedules(schedules);
    }

    const updateFieldSchedule = (schedule, id, field, value) => { 
        if(schedule.id === id ){ 
            if(field === "classroom") { schedule[field].number = value}
            else{ schedule[field] = value } 
        }
    }


    return (
            <div>
                { schedules===undefined ? <p>cargando...</p> 
                                        :
                                        <Accordion defaultActiveKey="0">
                                            {schedules.map (schedule => {
                                                return <ScheduleEditItem key={schedule.id}
                                                                         schedule={schedule} 
                                                                         updateSchedule={updateSchedule} />
                                            })} 
                                        </Accordion>
                }

            </div>
            
        )
}

export default ScheduleEditAccordion;