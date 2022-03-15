import { useState, useRef, useEffect } from 'react';
import '../css/Track.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';

/**
 *  @track is passed down from Dashboard
 *   containing artist, title, uri, albumUrl
 */

const isLikedSong = (track, likedSongs) => {
    if (!likedSongs.length) return false;
    for (let i = 0; i < likedSongs.length; i++) {
        var song = likedSongs[i];
        if (song.uri === track.uri) {
            return true
        }
    }
    return false;
}

const Track = ({ track, number, chooseTrack, likedSongs }) => {

    const [isCurrent, setIsCurrent] = useState(false);
    const [hover, setHover] = useState(false);
    const [isLiked, setIsLiked] = useState(() => {
        isLikedSong(track, likedSongs);
    })

    useEffect(() => {
        const handleFunction = () => {
            var temp = isLikedSong(track, likedSongs);
            setIsLiked(temp);
        }
        handleFunction();
    }, [track, likedSongs])
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

            <div className="rightSideTrackWrapper">
                {isLiked ? <FavoriteIcon className="rightSideIcon open likedSong" /> : <FavoriteBorderIcon className={hover ? "rightSideIcon open" : "rightSideIcon"} />}
                <span className="trackDuration"> {track.duration} </span>
                <MoreHorizIcon className={hover ? "rightSideIcon open" : "rightSideIcon"} />
            </div>

        </div>
    )

}

export default Track;