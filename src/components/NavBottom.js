import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import AddedPlaylistSuccess from './AddedPlaylistSuccess.js';
import '../css/Modal.css';


const defaultPlaceholder = "New playlist name";
const invalidPlaceholder = "Name must have at least one character!";

const NavBottom = ({ addNewPlaylist, displayLikedSongs }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [placeholder, setPlaceholder] = useState(defaultPlaceholder)
    const [playlistAdded, setPlaylistAdded] = useState(false);

    const handleModalClose = () => {
        setNewPlaylistName("");
        setPlaceholder(defaultPlaceholder);
        setModalIsOpen(false);
    }
    const handleInputChange = (e) => {
        setNewPlaylistName(e.target.value);
        if (placeholder === invalidPlaceholder) {
            setPlaceholder(defaultPlaceholder);
        }
    }

    const handleCreatePlaylist = (e) => {
        e.preventDefault();
        //create playlist
        if (!newPlaylistName.length) {
            setPlaceholder(invalidPlaceholder)
            return;
        }

        addNewPlaylist(newPlaylistName);
        setNewPlaylistName("");
        setModalIsOpen(false);
        setPlaylistAdded(true);
    }
    // get the user's liked songs
    const getLikedSongs = () => {
        displayLikedSongs();
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    const timerFinished = () => {
        setPlaylistAdded(false);
    }

    const handleOpenModalClick = (e) => {
        e.stopPropagation();
        setModalIsOpen(true)
    }
    return (
        <div className="navBottom">
            {playlistAdded && <AddedPlaylistSuccess timerFinished={timerFinished}/>}

            {modalIsOpen &&
                <div className="modal" onClick={() => handleModalClose()}>
                    <div className="contentWrap" onClick={(e) => stopPropagation(e)}>
                    <form className="playlistForm" onSubmit={(e) => handleCreatePlaylist(e)}>
                        <input
                            type="text"
                            className="newPlaylistNameBar"
                            placeholder={placeholder}
                            value={newPlaylistName}
                            onChange={handleInputChange}
                        />
                        <div className="rightSideForm">
                            <button className="modalButton" onClick={(e) => handleCreatePlaylist(e)}> Create </button>
                            <ClearIcon className="exitButton" onClick={() => handleModalClose()} />
                        </div>
                    </form>
                    </div>
                </div>
            }

            <div className="navItemWrap" onClick={(e) => handleOpenModalClick(e)}>
                <AddBoxIcon className="navIcon" />
                <div>  Create Playlist  </div>
            </div>

            <div className="navItemWrap" onClick={() => getLikedSongs()}>
                <FavoriteIcon className="navIcon" />
                <div>  Liked Songs  </div>
            </div>

        </div>
    )
}

export default NavBottom;