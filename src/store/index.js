import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import authReducer from "./Auth/Auth";
import audioReducer from "./audio/audio";
import recordsReducer from "./Records/Records";

const store = configureStore({
    reducer: { lang: langReducer, auth: authReducer, audio: audioReducer, records: recordsReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                // ignoredActions: ['audio'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload'],
                // Ignore these paths in the state
                ignoredPaths: ['audio'],
            },
        }),
});

export default store;