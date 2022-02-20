// import store from "../sage/store";
import createPromiseCapability from "./createPromiseCapability";

// 使用 Web Audio API
const AudioContext = window.AudioContext;
// ||
// window.webkitAudioContext ||
// window.mozAudioContext ||
// window.oAudioContext ||
// window.msAudioContext;

export const hasWebAudioAPI = {
  // eslint-disable-next-line no-restricted-globals
  data: !!AudioContext && location.protocol.indexOf("http") !== -1,
};

const music: any = {};

(() => {
  const musicPromise = createPromiseCapability();

  if (!hasWebAudioAPI.data) {
    return music;
  }
  const url = "./music.mp3";
  const context = new AudioContext();
  const req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onload = () => {
    context.decodeAudioData(
      req.response,
      (buf) => {
        // 将拿到的audio解码转为buffer
        const getSource = () => {
          // 创建source源。
          const source = context.createBufferSource();
          source.buffer = buf;
          source.connect(context.destination);
          return source;
        };

        music.loaded = true;

        musicPromise.resolve(getSource);
      },
      (error) => {
        if (window.console && window.console.error) {
          window.console.error(`音频: ${url} 读取错误`, error);
          hasWebAudioAPI.data = false;
        }

        musicPromise.reject(error);
      }
    );
  };

  music.killStart = () => {
    // 游戏开始的音乐只播放一次
    music.start = () => {};
  };

  music.start = () => {
    // 游戏开始
    music.killStart();
    musicPromise.promise.then((getSource) => {
      getSource().start(0, 3.7202, 3.6224);
    });
  };

  music.clear = () => {
    // 消除方块
    musicPromise.promise.then((getSource) => {
      getSource().start(0, 0, 0.7675);
    });
  };

  music.fall = () => {
    // 立即下落
    musicPromise.promise.then((getSource) => {
      getSource().start(0, 1.2558, 0.3546);
    });
  };

  music.gameover = () => {
    // 游戏结束
    musicPromise.promise.then((getSource) => {
      getSource().start(0, 8.1276, 1.1437);
    });
  };

  music.rotate = () => {
    // 旋转
    musicPromise.promise.then((getSource) => {
      getSource().start(0, 2.2471, 0.0807);
    });
  };

  music.move = () => {
    // 移动
    musicPromise.promise.then((getSource) => {
      getSource().start(0, 2.9088, 0.1437);
    });
  };

  req.send();

  return music;
})();

export default music;
