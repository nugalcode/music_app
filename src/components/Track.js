import { useState, useEffect } from 'react';
import '../css/Track.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
/**
 *  @track is passed down from Dashboard
 *   containing artist, title, uri, albumUrl
 */
const Track = ({ track, number }) => {

    const [hover, setHover] = useState(false);

    useEffect(() => {

        const handleOnHover = (e) => {
            // if the mouse is on this component, then set hover to true
            // else set it to false
            
        }

        //document.addEventListener()

        // on return, remove the eventlistener
        return 
    })

    return (
        <div className="track"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="playAndNumberWrap">
                { hover ?
                    <PlayArrowIcon className="trackPlayArrowIcon"/>
                    : <div className="songNumber"> {number} </div>
                }
            </div>
            <img src={track.albumUrl} alt="track_pic" />
            <div className="titleAndArtistWrap">
                <div> {track.title} </div> 
                <div> {track.artist} </div>
            </div>
        </div>
    )

}

export default Track;