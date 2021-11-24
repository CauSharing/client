import {createContext, useReducer} from "react";
import {UPDATE_GROUP} from './actionTypes';

const initialState = {
    groupName: "undefined",
    groupImg: null,
    groupUserList: [],
    groupIdx: null
};

const GroupContext = createContext({});

const reducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_GROUP:
            return {
                groupName: action.payload.groupName,
                groupImg: action.payload.groupImg,
                groupUserList: action.payload.groupUserList,
                groupIdx: action.payload.groupIdx
            };
        default:
            return state;
    }
};

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    console.log("Context: ", state);
    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export {GroupContext, Provider};