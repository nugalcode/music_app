import React from 'react';
import '../css/RightSideBar.css';
import '../css/LeftSideBar.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

const RightSideBar = () => {
    return (
        <div className="RightSideBar" title="for aesthetics only :)">
            <div className="friendActivity">
                    <div className="rightSideBarTitle">
                        <span> Friend Activity </span>
                        <PersonAddIcon className="addFriendButton" />
                    </div>
                <div className="friendsAndFollowers" >
                    <div className="description">
                        Let friends and followers on Spotify
                        see what you're listening to.
                    </div>
                    <div className="people">
                        <PersonIcon className="personIcon" />
                        <PersonIcon className="personIcon" />
                        <PersonIcon className="personIcon" />
                    </div>
                </div>
            </div>
            <div className="settings">
                <div className="description">
                    Go to Settings > Social and enable 'Share my listening activity on Spotify.'
                    You can turn this off at any time.
                </div>
                <div className="settingsButton"> SETTINGS </div>
            </div>
        </div>
    )
}

export default RightSideBar;