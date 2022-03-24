import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';

const NavBottom = ({ addNewPlaylist, displayLikedSongs }) => {

    // get the user's liked songs
    const getLikedSongs = () => {
        displayLikedSongs();
        
    }

    // add a new playlist 
    const createPlaylist = () => {
        addNewPlaylist();
    }

    return (
        <div className="navBottom">

            <div className="navItemWrap" onClick={() => createPlaylist()}>
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