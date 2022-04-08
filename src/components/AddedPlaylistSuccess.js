import { useState, useEffect } from 'react';

const AddedPlaylistSuccess = ({ timerFinished }) => {

    const [visible, setVisible] = useState(true);

    // on component render, it'll start the countdown
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            timerFinished();
        }, 5000)
        return () => clearTimeout(timer);
    })

    return (
        visible && 
            <div className="addedPlaylistSuccess">
                <span> Playlist Successfully Added </span>
            </div>
    )
}

export default AddedPlaylistSuccess;
