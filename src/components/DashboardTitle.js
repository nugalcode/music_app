import React from 'react';
import '../css/DashboardTitle.css';

const DashboardTitle = ({showLibrary}) => {
    return (
        <div id="dashboardTitle">
            {showLibrary ? 
                <h1> Your Library </h1>
                :
                <h1> Search Results </h1>
            }
        </div>
    )
}

export default DashboardTitle;