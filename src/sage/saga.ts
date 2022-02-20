import { takeLatest } from "redux-saga/effects";
import { GameStatActionEnum } from "./contants";
import music from "../utils/music";

console.log("music", music);

const handleStart = function () {
  music.start();
};
const handleRunning = function* () {};
const handleEnd = function* () {};
const handlePause = function* () {};
const handleReStart = function* () {};

const rootSaga = function* () {
  yield takeLatest(GameStatActionEnum.START, handleStart);
  yield takeLatest(GameStatActionEnum.RUNNING, handleRunning);
  yield takeLatest(GameStatActionEnum.END, handleEnd);
  yield takeLatest(GameStatActionEnum.PAUSE, handlePause);
  yield takeLatest(GameStatActionEnum.RESTART, handleReStart);
};

export default rootSaga;
