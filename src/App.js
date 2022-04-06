import React from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { PlayDetailsProvider } from "./hooks/playDetailsContext"
// get the code from the url
const code = new URLSearchParams(window.location.search).get('code');

function App() {
    return code ?
        (<PlayDetailsProvider>
            <Dashboard code={code} />
        </PlayDetailsProvider>)
        :
        <Login />
} 

export default App;
