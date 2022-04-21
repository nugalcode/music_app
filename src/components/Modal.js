import { useState } from 'react';
import '../css/Modal.css';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Modal = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const stopPropagation = (e) => {
        e.stopPropagation();
    }
    return (
        <div className="leftSideBarModal">
            {isOpen ?
                <MenuOpenIcon className="menuIcon" onClick={() => setIsOpen(false)}/>
                :
                <MenuIcon className="menuIcon" onClick={() => setIsOpen(true)}/>
            }
            {
            isOpen &&
                <div className="modal" onClick={() => setIsOpen(!isOpen)}>
                    <div className="contentWrap" >
                        {children}
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal;