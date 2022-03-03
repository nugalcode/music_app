import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import '../css/Dashboard.css';

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [searchTerm, setSearchTerm] = useState("");

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleOnSubmit = (e) => {
        // only search the term if it isn't empty
        if (searchTerm) {
            // call API
            // reset searchTerm
            setSearchTerm("")
        }


    }
    return (
        <div className="dashboard">
            <form onSubmit={handleOnSubmit}>
                <input
                    type="search"
                    className="searchBar"
                    placeholder="Search Song or Artist"
                    value={searchTerm}
                    onChange={handleOnChange}
                />
            </form>
        </div>
    )
}

export default Dashboard;