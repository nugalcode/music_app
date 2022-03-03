import React from 'react';
import '../css/Track.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
/**
 *  @track is passed down from Dashboard
 *   containing artist, title, uri, albumUrl
 */
const Track = ({ track, number }) => {

    return (
        <div className="track">
            <div className="songNumber"> {number} </div>
            <img src={track.albumUrl} alt="track_pic" />
            <div className="titleAndArtistWrap">
                <div> {track.title} </div> 
                <div> {track.artist} </div>
            </div>
        </div>
    )

}

export default Track;