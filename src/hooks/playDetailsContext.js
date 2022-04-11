import React, { useReducer } from 'react';

export const playDetailsDispatchContext = React.createContext();
export const playDetailsStateContext = React.createContext();

const initialState =
{
    uris: [],
    offset: 0,
    play: false,
}

export const ACTIONS = {
    CHANGEURIS: "changeUris",
    STARTPLAYING: "startPlaying",
    STOPPLAYING: "stopPlaying",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "changeUris":
            return { ...state, uris: action.uris, offset: action.offset };
        case "startPlaying":
            return { ...state, play: true };
        case "stopPlaying":
            return { ...state, uris: [], play: false };
        default:
            throw new Error();
    }
}


export const PlayDetailsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <playDetailsStateContext.Provider value={state}>
            <playDetailsDispatchContext.Provider value={dispatch}>
                {children}
            </playDetailsDispatchContext.Provider>
        </playDetailsStateContext.Provider>
    );


}