// type DateType = number | { [key: string]: any };
type CompareType<T> = (a: T, b: T) => number;
type OptionsType<T> = {
  compare: CompareType<T>;
  defaultValue?: Array<T>;
};

// const defaultCompare: CompareType<number> = (a, b) => a - b;
/*
 * @params Array    defaultValue   列表
 * @params Function compare        比对函数 ，用法同 原生 Array sort 方法
 */
class Heap<T> {
  private compare: CompareType<T>;
  private store: Array<T>;
  constructor(options: OptionsType<T>) {
    const { defaultValue = [], compare } = options;
    this.compare = compare;
    // || defaultCompare;
    this.store = defaultValue || [];

    // 1 至 Math.floor(store.length / 2) -- 为有子节点的节点
    for (let i = Math.floor(this.store.length / 2); i >= 0; i--) {
      this._sink(i);
    }
  }

  getHead(): T {
    return this.store[0];
  }

  isEmpty(): boolean {
    return !this.store.length;
  }

  size(): number {
    return this.store.length;
  }

  // 插入元素
  insert(obj: T): void {
    this._heapUp(obj);
  }

  // 删除元素
  delete(fn: (d: T) => boolean): boolean {
    if (typeof fn === "function") {
      const index = this.store.findIndex((d) => fn(d));
      return !!this._del(index);
    }
    return false;
  }

  // 返回最顶层元素
  pop(): T | false {
    return this._del(0);
  }

  // 上浮
  private _heapUp(obj: T) {
    const { compare, store } = this;
    store.push(obj);
    let index = store.length - 1;
    let parentIndex = Math.floor(index / 2);
    while (true) {
      if (compare(store[parentIndex], store[index]) <= 0) return;
      this._swap(store, parentIndex, index);
      if (parentIndex <= 0) return;
      index = parentIndex;
      parentIndex = Math.floor(parentIndex / 2);
    }
  }

  // 下沉
  private _sink(index = 0) {
    const { compare, store } = this;
    const len = store.length;
    while (true) {
      let c = index;
      if (
        index * 2 <= len &&
        store[index * 2] !== undefined &&
        compare(store[index], store[index * 2]) > 0
      ) {
        c = index * 2;
      }

      if (
        index * 2 + 1 <= len &&
        store[index * 2 + 1] !== undefined &&
        compare(store[c], store[index * 2 + 1]) > 0
      ) {
        c = index * 2 + 1;
      }
      // 如果 c === index 即表示 左右节点均不需要修改 直接返回就好
      if (c === index) break;
      this._swap(store, c, index);
      index = c;
    }
  }

  // 交换
  private _swap(arr: T[], i: number, j: number) {
    if (this.compare(arr[i], arr[j]) === 0) return;
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  private _del(index = 0): T | false {
    const { store } = this;
    let r = store[index];
    if (r === undefined) return false;
    store[index] = store[store.length - 1];
    store.pop();
    this._sink(index);
    return r;
  }
}

export default Heap;
