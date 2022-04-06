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

const reducer = (state, action) => {
    switch (action.type) {
        case "changeUris":
            console.log("changeUris action")
            console.log(action.offset);
            return { uris: action.uris, offset: action.offset, play: true };
        case "changeOffset":
            console.log("changeOffset")
            return { uris: state.uris, offset: action.offset, play: state.play };
        case "startPlaying":
            console.log("startPlaying")
            return { uris: [...state.uris], offset: state.offset, play: true };
        case "stopPlaying":
            console.log("stopPlaying");
            return { uris: [...state.uris], offset: state.offset, play: false };
        
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