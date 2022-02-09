// import store from "../sage/store";

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
  if (!hasWebAudioAPI.data) {
    return;
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

        music.killStart = () => {
          // 游戏开始的音乐只播放一次
          music.start = () => {};
        };

        music.start = () => {
          // 游戏开始
          music.killStart();
          // if (!store.getState().get("music")) {
          //   return;
          // }
          getSource().start(0, 3.7202, 3.6224);
        };

        music.clear = () => {
          // 消除方块
          getSource().start(0, 0, 0.7675);
        };

        music.fall = () => {
          // 立即下落
          getSource().start(0, 1.2558, 0.3546);
        };

        music.gameover = () => {
          // 游戏结束
          getSource().start(0, 8.1276, 1.1437);
        };

        music.rotate = () => {
          // 旋转
          getSource().start(0, 2.2471, 0.0807);
        };

        music.move = () => {
          // 移动
          getSource().start(0, 2.9088, 0.1437);
        };
      },
      (error) => {
        if (window.console && window.console.error) {
          window.console.error(`音频: ${url} 读取错误`, error);
          hasWebAudioAPI.data = false;
        }
      }
    );
  };

  req.send();
})();

export default music;
