import PropTypes from 'prop-types';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import 'jb-modal';
// eslint-disable-next-line no-duplicate-imports
import { JBModalWebComponent } from 'jb-modal';
import { useEvent } from '../../custom-hooks/UseEvent';
export type JBModalProps = {
    onClose?: () => void,
    onUrlOpen?: () => void,
    children: any,
    className?:string,
    isOpen: boolean,
    id?: string,
}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-modal': JBModalType;
      }
      interface JBModalType extends React.DetailedHTMLProps<React.HTMLAttributes<JBModalWebComponent>, JBModalWebComponent> {
        class?:string,
      }
    }
}
const JBModal = React.forwardRef((props:JBModalProps, ref) => {
    const element = useRef<JBModalWebComponent>(null);
    const [refChangeCount, refChangeCountSetter] = useState(0);
    useImperativeHandle(
        ref,
        () => (element ? element.current : {}),
        [element],
    );
    useEffect(() => {
        refChangeCountSetter(refChangeCount + 1);
    }, [element.current]);
    useEffect(() => {
        if (element.current) {
            if (props.isOpen == true) {
                element.current.open();
            } else {
                element.current.close();
            }
        }

    }, [props.isOpen]);
    useEffect(() => {
        if (props.id !== undefined && element.current) {
            element.current.addEventListener('urlOpen', onUrlOpen);
            element.current.id = props.id;
        }
        return () => {
            if (props.id !== undefined && element.current) {
                element.current.removeEventListener('urlOpen', onUrlOpen);
            }
        };
    }, [props.id]);
    function onClose() {
        if (props.onClose) {
            props.onClose();
        }
    }
    function onUrlOpen() {
        if (props.onUrlOpen) {
            props.onUrlOpen();
        }
    }
    useEvent(element.current, 'close', onClose);
    return (
        <jb-modal ref={element} class={props.className ? props.className : ''}>
            <div slot="content">
                {props.children}
            </div>
        </jb-modal>
    );
});
JBModal.propTypes = {
    onClose: PropTypes.func,
    onUrlOpen: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element,
    id: PropTypes.string,
    className:PropTypes.string
};
JBModal.displayName = "JBModal";
export {JBModal};
