import React from 'react';
import '../css/ContextMenu.css';

const ContextMenu = ({ position }) => {
	const style = {
		top: position.y,
		left: position.x,
		position: 'absolute'
	}
	return (
		<div className="contextMenu" style={style}>
			<div className="contextMenuItem"> Option 1 </div>
			<div className="contextMenuItem"> Option 2</div>
			<div className="contextMenuItem"> Option 3</div>
		</div>
	)
}

export default ContextMenu;