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
        <>
            {isOpen ?
                <MenuOpenIcon className="menuIcon" onClick={() => setIsOpen(false)}/>
                :
                <MenuIcon className="menuIcon" onClick={() => setIsOpen(true)}/>
            }
            {
            isOpen &&
                <div className="modal" onClick={() => setIsOpen(!isOpen)}>
                    <div className="contentWrap" onClick={(e) => stopPropagation(e)}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;