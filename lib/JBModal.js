import PropTypes from 'prop-types';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import 'jb-modal';
import { useEvent } from '../../custom-hooks/UseEvent';
const JBModal = React.forwardRef((props, ref)=>{
    const element = useRef();
    const [refChangeCount, refChangeCountSetter] = useState(0);
    useImperativeHandle(
        ref,
        () => (element?element.current:{}),
        [element],
    );
    useEffect(() => {
        refChangeCountSetter(refChangeCount + 1);
    }, [element.current]);
    useEffect(()=>{
        if(props.isOpen == true){
            element.current.open();
        }else{
            element.current.close();
        }
    },[props.isOpen]);
    useEffect(()=>{
        if(props.id !== undefined){
            element.current.addEventListener('urlOpen',onUrlOpen);
            element.current.id = props.id;
        }
        return ()=>{
            if(props.id !== undefined && element.current ){
                element.current.removeEventListener('urlOpen',onUrlOpen);
            }
        };
    },[props.id]);
    function onClose(){
        if(props.onClose){
            props.onClose();
        }
    }
    function onUrlOpen(){
        if(props.onUrlOpen){
            props.onUrlOpen();
        }
    }
    useEvent(element.current,'close',onClose);
    return (
        <jb-modal ref={element}>
            <div slot="content">
                {props.children}
            </div>
        </jb-modal>
    );
});
JBModal.propTypes={
    onClose: PropTypes.func,
    onUrlOpen:PropTypes.func,
    isOpen:PropTypes.bool,
    children: PropTypes.element,
    id: PropTypes.string
};
JBModal.displayName="JBModal";
export default JBModal;
