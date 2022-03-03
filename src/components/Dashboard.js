import React from 'react';
import useAuth from '../hooks/useAuth.js';

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    return (
        <div>
            {code}
        </div>
    )
}

export default Dashboard;