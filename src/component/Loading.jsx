import React from 'react';
// Semantic UI
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = (active=true,inverted=false,classname="") => {

    return <Dimmer active={active} inverted={inverted}>
                <Loader indeterminate className={classname}>Cargando...</Loader>
            </Dimmer>
}

export default Loading;