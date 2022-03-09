import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';

const NavBottom = () => {
    return (
        <div className="navBottom">

            <div className="navItemWrap">
                <AddBoxIcon className="navIcon" />
                <div>  Create Playlist  </div>
            </div>

            <div className="navItemWrap">
                <FavoriteIcon className="navIcon" />
                <div>  Liked Songs  </div>
            </div>

        </div>
    )
}

export default NavBottom;