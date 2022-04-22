# Music Player App Personal Project

This React project uses the spotify API with other wrapper libraries to fetch spotify data. The app uses the data to search and play tracks.

For more information about this app in depth: 
[Docs Demos](https://docs.google.com/document/d/1C8v7zAemUZ1iJDIxxE02xptXoQHYDJpya5S-GOw6O0Y/edit?usp=sharing)

## Features
1) Search and play tracks by title or artist
	*** User must be a premium Spotify user to be able to play songs *** 
2) Create, unfollow, display, add to and play a user's playlists 
	*** Spotify API does not have an option to delete a playlist, thus the app uses unfollow to mimic the behavior ***
3) Remove tracks from a playlist

## Tools and Technologies
1) JavaScript
2) HTML
3) CSS, Flexbox
4) React
5) Spotify API
6) spotify-web-api-node - Spotify wrapper library
7) react-spotify-web-playback - Spotify Player library 

## Key Components
1) Login - directs user to log in through Spotify- redirects to Dashboard after successfully logging in
2) Dashboard - the center component
3) Track - individual song - option to add to a designated playlist, option to add/remove from user's Liked Songs
4) Player - returns a SpotifyPlayer from react-spotify-web-playback that plays given track uris
5) YourLibrary - display's user's playlists and liked songs
6) LeftSideBar - list of user's playlists, playlist creation, user's liked songs

## React Practices
1) All components are functional components
2) Hooks: useState, useEffect, useContext, useReducer, useCallback, useRef

## Attributions
1) Wrapper Library: https://www.npmjs.com/package/spotify-web-api-node 
2) SpotifyPlayer: https://www.npmjs.com/package/react-spotify-web-playback
3) Spotify Api: https://developer.spotify.com/documentation/web-api/

