import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from '../features/Song/SongSlice'
import songSaga from '../saga/song/songSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        songs: songsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(songSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;