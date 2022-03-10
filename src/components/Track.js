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

    const handlePlay = () => {
        chooseTrack(track);
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
            ref={ref}
        >

            <div className="playAndNumberWrap">
                { hover ?
                    <PlayArrowIcon className="trackPlayArrowIcon" onClick={() => handlePlay()}/>
                    : <div className="songNumber"> {number} </div>
                }
            </div>

            <img src={track.albumUrl} alt="track_pic" />

            <div className="titleAndArtistWrap">
                <span className={isCurrent ? "title greenTitle" : "title"} title={track.title}> {track.title} </span>
                <span className="artist"> {track.artist} </span>
            </div>

            <div className="albumName">
                {track.albumName}
            </div>

            <div className="trackDuration">
                {track.duration}
            </div>

        </div>
    )

}

export default Track;