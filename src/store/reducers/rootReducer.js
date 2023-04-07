import { combineReducers } from "redux";
import appReducer from "./appReducer";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducer";
import { persistReducer } from "redux-persist";
import authReducer from "./authReducer";
import userReducer from "./userReducer";


const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whiteList: ['curSongId'],

}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whiteList: ['isLoggedIn', 'token'],
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer),
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,

})

export default rootReducer;