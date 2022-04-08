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
    CHANGEOFFSET: "changeOffset",
    STARTPLAYING: "startPlaying",
    STOPPLAYING: "stopPlaying",
}

function getUris(tracks) {
    return (tracks.map((track) => {
        return track.uri
    }));
}

const reducer = (state, action) => {
    switch (action.type) {
        case "changeUris":
            console.log("changeUris action")
            console.log(action.offset);
            return { ...state, uris: [...action.uris], offset: action.offset };
        case "startPlaying":
            console.log("startPlaying")
            return { ...state, play: true };
        case "stopPlaying":
            console.log("stopPlaying");
            return { ...state, uris: [], play: false };
        default:
            throw new Error();
    }
}


export const PlayDetailsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // use memo prevents unnecessary rerenders of children who are subscribed to this context
   /* const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch])*/

    return (
        <playDetailsStateContext.Provider value={state}>
            <playDetailsDispatchContext.Provider value={dispatch}>
                {children}
            </playDetailsDispatchContext.Provider>
        </playDetailsStateContext.Provider>
    );


}