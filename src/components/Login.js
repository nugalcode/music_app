import React from 'react';
import '../css/Login.css';

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=8f9b068eeffc4fd0a27b7599b1df9050&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-read-private%20playlist-modify-public"

export default function Login() {
    return (
        <div className="login">
            <a className="loginButton" href={AUTH_URL}>
                <span> Spotify Login </span>
            </a>
        </div>
    )
}
