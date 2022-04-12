import { useState } from 'react';
import '../css/ContextMenu.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ContextMenu = ({ position, playlists, userID, addTrackToPlaylist, playlistToBeRemoved, removePlaylist, currentPlaylist, removeTrackFromPlaylist }) => {
	const style = {
		top: position.y,
		left: position.x,
		position: 'absolute'
	}

	const [addPlaylistHover, setAddPlaylistHover] = useState(false)

	const handleOnMouseOver = () => {
		setAddPlaylistHover(true);
	}
	const handleOnMouseLeave = () => {
		setAddPlaylistHover(false);
	}
	const handlePreventBubble = (e) => {
		e.stopPropagation();
	}

	const handleAddTrackToPlaylist = (playlistID) => {
		addTrackToPlaylist(playlistID);
		setAddPlaylistHover(false);
	}
	const handleRemovePlaylist = () => {
		removePlaylist();
	}

	const handleRemoveTrackFromPlaylist = () => {
		removeTrackFromPlaylist();
    }
	return (
		Object.keys(playlistToBeRemoved).length === 0 ?
			<div className="contextMenu" style={style}>
				<div className="contextMenuItem"
					onMouseEnter={() => handleOnMouseOver()}
					onMouseLeave={() => handleOnMouseLeave()}>
					Add to playlist
					<ArrowRightIcon />
					{addPlaylistHover &&
						<div className="contextPlaylists"
							onMouseDown={(e) => handlePreventBubble(e)}>
							{playlists.map((playlist, index) => {
								return ( userID === playlist.ownerID && 
									<div className="contextMenuItem" key={index} onClick={() => handleAddTrackToPlaylist(playlist.playlistID)}>
										{playlist.name}
									</div>
								)
							})}
						</div>
					}
				</div>
				{userID === currentPlaylist.ownerID &&
					<div className="contextMenuItem" onMouseDown={(e) => handlePreventBubble(e)} onClick={() => handleRemoveTrackFromPlaylist()}>
						Remove from this playlist
					</div>}
			</div>
			:
			<div className="contextMenu" onMouseDown={(e) => handlePreventBubble(e)} style={style}>
				<div className="contextMenuItem" onClick={() => handleRemovePlaylist()}>
					Unfollow Playlist
				</div>
			</div>
	)
}

export default ContextMenu;