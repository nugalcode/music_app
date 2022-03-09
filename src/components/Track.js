import { useState, useRef, useEffect } from 'react';
import '../css/Track.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
/**
 *  @track is passed down from Dashboard
 *   containing artist, title, uri, albumUrl
 */
const Track = ({ track, number, chooseTrack }) => {

    const [isCurrent, setIsCurrent] = useState(false);
    const [hover, setHover] = useState(false);
    const ref = useRef();

    /*const handleClick = () => {
        setPlaying(true);
    }*/

    const handlePlay = () => {
        chooseTrack(track);
        //handleClick();
    }

    useEffect(() => {
        const handleTitle = (e) => {
            // if the click is not on this component, then set playing to false
            if (ref.current && !ref.current.contains(e.target)) {
                setIsCurrent(false);
            }
            else if (ref.current && ref.current.contains(e.target)) {
                setIsCurrent(true);
            }
        }

        document.addEventListener('mouseup', handleTitle);
        return () => document.removeEventListener('mouseup', handleTitle)
    })

    return (
        <div className="track"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handlePlay()}
            ref={ref}
        >
            <div className="playAndNumberWrap">
                { hover ?
                    <PlayArrowIcon className="trackPlayArrowIcon" />
                    : <div className="songNumber"> {number} </div>
                }
            </div>
            <img src={track.albumUrl} alt="track_pic" />
            <div className="titleAndArtistWrap">
                <div className={isCurrent ? "greenTitle" : ""}> {track.title} </div>
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