import { all, call, put, takeEvery } from "redux-saga/effects";
import { NewSong ,Song,SongStats} from "../../types/types";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  fetchSongsStats,
  FetchSongsStatsSuccess,
  FetchSongsStatsFailure,
} from "../../features/Song/SongSlice";
import {
  fetchSongsApi,
  createSongApi,
  updateSongApi,
  deleteSongApi,
  fetchSongsStatsApi,
} from "../../api/api";

// songs List fetch worker and watcher
function* fetchSongsSaga() {
    try {
        const songs: Song[] = yield call(fetchSongsApi);
        yield put(fetchSongsSuccess(songs));
    } catch (error) {
        yield put(fetchSongsFailure((error as Error).message));
    }
}

function * watchFetchSongsSaga() {
    yield takeEvery(fetchSongs.type, fetchSongsSaga);
}

// create song worker and watcher
function* createSongSaga(action: ReturnType<typeof createSong>) {
    try {
        const newSong: NewSong = action.payload!;
        const createdSong: Song = yield call(createSongApi, newSong);
        yield put(createSongSuccess(createdSong));
    } catch (error) {
        yield put(createSongFailure((error as Error).message));
    }
}

function* watchCreateSongSaga() {
    yield takeEvery(createSong.type, createSongSaga);
}
// update song worker and watcher
function* updateSongSaga(action: ReturnType<typeof updateSong>) {
    try {
        const updatedSong: Song = action.payload!;
        const id: string = updatedSong._id;
        const result: Song = yield call(updateSongApi, updatedSong, id);
        yield put(updateSongSuccess(result));
    } catch (error) {
        yield put(updateSongFailure((error as Error).message));
    }
}

function* watchUpdateSongSaga() {
    yield takeEvery(updateSong.type, updateSongSaga);
}

// delete song worker and watcher
function* deleteSongSaga(action: ReturnType<typeof deleteSong>){
    try {
        const id: string = action.payload!;
        yield call(deleteSongApi, id);
        yield put(deleteSongSuccess(id));
    } catch (error) {
        yield put(deleteSongFailure((error as Error).message));
    }
}
function* watchDeleteSongSaga() {
    yield takeEvery(deleteSong.type, deleteSongSaga);
}

// fetch song statistics worker and watcher
function* fetchSongsStatsSaga() {
    try {
        const songSaga: SongStats = yield call(fetchSongsStatsApi);
        yield put(FetchSongsStatsSuccess(songSaga));
    } catch (error) {
        yield put(FetchSongsStatsFailure((error as Error).message));
    }
}

function* watchFetchSongsStatsSaga() {
    yield takeEvery(fetchSongsStats.type, fetchSongsStatsSaga);
}


export default function* songSaga() {
    yield all([
        watchFetchSongsSaga(),
        watchCreateSongSaga(),
        watchUpdateSongSaga(),
        watchDeleteSongSaga(),
        watchFetchSongsStatsSaga(),
    ]);
}