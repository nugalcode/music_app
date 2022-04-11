import { useState, useEffect, useContext } from 'react';
import '../css/Track.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ACTIONS, playDetailsDispatchContext, playDetailsStateContext } from "../hooks/playDetailsContext";
/**
 *  @track is passed down from Dashboard
 *   containing artist, title, uri, albumUrl
 */

const checkIfLiked = (number, likedSongs) => {
    const trackIndex = number - 1;
    if (trackIndex >= 0 && trackIndex < likedSongs.length && likedSongs[trackIndex]) {
        return true;
    }
    else {
        return false;
    }
}

const Track = ({ track, number, isCurrent, chooseTrack, likedSongs, handleSetMenuIsOpen, changeTrackLikeStatus }) => {
    const dispatch = useContext(playDetailsDispatchContext);
    const state = useContext(playDetailsStateContext);
    const [hover, setHover] = useState(false);
    const [isLiked, setIsLiked] = useState(() => {
        return checkIfLiked(number, likedSongs)
    })

    // if user likes / unlikes a track
    const handleLikeChange = () => {
        changeTrackLikeStatus(track, isLiked);
        setIsLiked(!isLiked);
    }
    const handlePlay = () => {
        if (isCurrent) {
            dispatch({ type: ACTIONS.STARTPLAYING })
        }
        else {
            chooseTrack(track);
        }
    }
    const handlePause = () => {
        if (state.play) {
            dispatch({ type: ACTIONS.STOPPLAYING })
        }
    }
    // set the liked status of this track
    useEffect(() => {
        if (!likedSongs.length || !track || !track.id) return

        const handleFunction = () => {
            if (checkIfLiked(number, likedSongs)) {
                setIsLiked(true);
            }
            else {
                setIsLiked(false);
            }
        }
        handleFunction();

    }, [track, likedSongs, number])

    const handleOnClick = (e) => {
        const position = { x: e.clientX, y: e.clientY };
        handleSetMenuIsOpen(position, track.uri);
    }
        
    return (

        <div className="track"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            <div className="playAndNumberWrap">
                { hover ?
                    (state.play && isCurrent ?
                        <PauseIcon className="trackPlayArrowIcon" onClick={() => handlePause()}/>
                        :
                        <PlayArrowIcon className="trackPlayArrowIcon" onClick={() => handlePlay()} />
                    )
                    : <div className="songNumber"> {number} </div>
                }
            </div>

            <img src={track.albumUrl} alt="track_pic" />

            <div className="titleAndArtistWrap">
                <span className={isCurrent ? "title greenTitle" : "title"} title={track.title}> {track.title} </span>
                <span className="artist"> {track.artist} </span>
            </div>

            <div className="albumName">
                <span> {track.albumName} </span>
            </div>

            <div className="rightSideTrackWrapper">
                {isLiked ?
                    <FavoriteIcon className="rightSideIcon open likedSong" onClick={() => handleLikeChange()}/>
                    :
                    <FavoriteBorderIcon className={hover ? "rightSideIcon open" : "rightSideIcon"} onClick={() => handleLikeChange()}/>
                }
                <span className="trackDuration"> {track.duration} </span>
                <MoreHorizIcon className={hover ? "rightSideIcon open" : "rightSideIcon"}
                    onClick={(e) => handleOnClick(e)}
                />
            </div>

        </div>
    )

}

export default Track;