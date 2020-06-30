import React from 'react';
import { shallow } from 'enzyme';
import Filters from './Filters';

describe('Filtering Subjects by some of available filter methods',
    ()=>{
        it('Fitler should be rendered correctly',
            ()=>{
                const component = shallow(
                    <Filters subjectSuggestions={[]}
                             classroomSuggestions={[]}/>,
                );
                expect(component).toMatchSnapshot();
            }
        );
    }
);