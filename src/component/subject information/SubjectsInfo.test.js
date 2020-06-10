import React from 'react';
import { shallow } from 'enzyme';
import SubjectsInfo from './SubjectsInfo';
import NotFound from '../NotFound';

describe('Rendering subject info layout',
    ()=>{
        it('if not found subjects not found label should display',
            ()=>{
                const component = shallow(
                    <SubjectsInfo subjects={[]}
                                  notFound={true}/>,
                );
                
                expect(
                    component.contains(
                                <NotFound className="text-center" 
                                          label={"No se ha Encontrado Ninguna Materia."}/>
                    )).toBe(true);
            }
        );
    }
);