import { useState } from 'react';
import '../css/Track.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
/**
 *  @track is passed down from Dashboard
 *   containing artist, title, uri, albumUrl
 */
const Track = ({ track, number, chooseTrack }) => {

    const [hover, setHover] = useState(false);

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <div className="track"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handlePlay()}
        >
            <div className="playAndNumberWrap">
                { hover ?
                    <PlayArrowIcon className="trackPlayArrowIcon" />
                    : <div className="songNumber"> {number} </div>
                }
            </div>
            <img src={track.albumUrl} alt="track_pic" />
            <div className="titleAndArtistWrap">
                <div> {track.title} </div> 
                <div> {track.artist} </div>
            </div>

            <div className="albumName">
                {track.albumName}
            </div>

            <div className="trackDuration"> {track.duration} </div>
        </div>
    )

}

export default Track;