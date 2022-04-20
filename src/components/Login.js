import React from 'react';
import '../css/Login.css';
import spotifyLogo from '../imgs/spotify_icon_attribution.png'

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=8f9b068eeffc4fd0a27b7599b1df9050&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-read-private%20playlist-modify-public"

export default function Login() {
    return (
        <div className="login">
            <a className="loginButton" href={AUTH_URL}>
                <span> Spotify Login </span>
            </a>
            <div className="informationWrap">
                <span className="information"> **This application requires a Spotify login. Your account must be a premium account to be able to play songs.</span>
                <span className="information"> **This application does NOT store your account information. </span>
                <span className="information"> **Login is authorized directly by Spotify and all requests (i.e. adding songs, creating playlists, liking songs, etc) are made
                    through the official Spotify API. </span>
                <span className="information"> **Songs, playlists, albums, and metadata are credited to Spotify, Spotify artists, and affiliates. </span>
                <div className="spotifyLogoWrap"> <img src={spotifyLogo} alt="spotifyLogo" className="spotifyLogo"/> </div>
            </div> 
        </div>
    )
}
