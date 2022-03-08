import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TrackHeader = () => {
    return (
        <div className="TrackHeader">
            <div className="playAndNumberWrap">
                <div className="songNumber"> # </div> 
            </div>
            
            <div className="titleAndArtistWrap">
                <div> title </div>
            </div>

            <div className="albumName">
                album
            </div>

            <div className="trackDuration">
                <AccessTimeIcon />
            </div>
        </div>
    )
}

export default TrackHeader;