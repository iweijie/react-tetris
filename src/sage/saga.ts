// TODO 暂时用不到saga
import { takeLatest } from "redux-saga/effects";
import { GameStateActionEnum } from "./contants";
import music from "../utils/music";

const handleStart = function () {
  music.start();
};
const handleRunning = function* () {};
const handleEnd = function* () {};
const handlePause = function* () {};
const handleReStart = function* () {};

const rootSaga = function* () {
  yield takeLatest(GameStateActionEnum.START, handleStart);
  yield takeLatest(GameStateActionEnum.RUNNING, handleRunning);
  yield takeLatest(GameStateActionEnum.END, handleEnd);
  yield takeLatest(GameStateActionEnum.PAUSE, handlePause);
  yield takeLatest(GameStateActionEnum.RESTART, handleReStart);
};

export default rootSaga;
