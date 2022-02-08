import Heap from "./Heap";

let uuid = 0;

type ListenerDataType = {
  // 是否在开始之前调用一次
  leading?: boolean;
  // 调用次数, -1 表示不计算次数
  count?: number;
  // 刷新频率
  HZ: number;
  // 监听事件
  listener: () => void;
};

type EngineDataType = Required<
  ListenerDataType & {
    // 到期时间(ms)
    timeout: number;
    // 唯一ID
    id: number;
  }
>;

export class Engine {
  private heap: Heap<EngineDataType>;
  private _f: boolean | number | NodeJS.Timer | null;
  private status: "start" | "stop";
  constructor() {
    this.heap = new Heap({
      compare: (a, b) => a.timeout - b.timeout,
    });
    this._f = null;
    this.status = "stop";
  }

  // TODO 新增 once ，前置触发等
  addListener(d: ListenerDataType) {
    const uid = ++uuid;
    const { count, leading, ...other } = d;
    const d1: EngineDataType = {
      ...other,
      leading: typeof leading === "undefined" ? false : !!leading,
      count: typeof count === "number" ? Math.max(-1, count) : -1,
      timeout: this.status === "start" ? Date.now() + d.HZ : 0,
      id: uid,
    };

    this.heap.insert(d1);

    return this._removeListener.bind(this, uid);
  }

  private _removeListener(uid: number) {
    return this.heap.delete((d) => {
      return d.id === uid;
    });
  }

  start() {
    if (this.status === "start") return;
    this.status = "start";
    this._initByCall();

    if (typeof requestAnimationFrame === "function") {
      this._f = true;
      const callback = () => {
        if (this._f === false) return;
        this.loop();
        requestAnimationFrame(callback);
      };
      requestAnimationFrame(callback);
    } else if (typeof setInterval === "function") {
      this._f = setInterval(() => {
        this.loop();
      }, 16.66);
    }
  }

  stop() {
    if (this.status === "stop") return;
    this.status = "stop";
    if (this._f === true) {
      this._f = false;
    } else if (typeof this._f === "number") {
      clearInterval(this._f);
    } else {
      throw new TypeError("设置定时器类型错误");
    }
  }

  private _initByCall() {
    const size = this.heap.size();
    const list = new Array(size);
    const d = Date.now();
    for (let i = 0; i < size; i++) {
      const d1 = this.heap.pop();
      if (d1 && d1.id) {
        d1.timeout = d + d1.HZ;
        list.push(d1);
      }
    }

    list.forEach((d) => {
      if (d.leading) {
        d.listener();
        if (d.count !== -1) {
          d.count -= 1;
        }
      }

      this.heap.insert(d);
    });
  }

  private loop() {
    const d = Date.now();
    while (true) {
      const head = this.heap.getHead();
      if (head && head.timeout <= d) {
        this.heap.pop();
        head.timeout += head.HZ;
        if (head.count === -1) {
          this.heap.insert(head);
        } else {
          head.count -= 1;
          if (head.count > 0) {
            this.heap.insert(head);
          }
        }
        head.listener();
      } else {
        break;
      }
    }
  }
}

export type EngineType = typeof Engine;

export default new Engine();
