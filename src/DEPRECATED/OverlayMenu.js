import React, { useState, useRef } from 'react';
import { Overlay, Button } from 'react-bootstrap';
// react-icons
import { BsList } from 'react-icons/bs';

function OverlayMenu({popover}){

    const [showElement, setShowElement] = useState(false);
    const target = useRef(null);
    const container = useRef(null);
    const show = () =>{ setShowElement(true);  }
    const hide = () =>{ setShowElement(false);  }

    return (
        <div ref={container}>
            <Button ref={target} 
                    onClick={show}
                    onMouseOut={hide} 
                    variant="light">
                <BsList size='1em'/>
            </Button>
            <Overlay target={target.current} 
                     show={showElement} 
                     placement="right"
                     container={container.current}>
                {popover}
            </Overlay>
        </div>
        );
}

export default OverlayMenu;