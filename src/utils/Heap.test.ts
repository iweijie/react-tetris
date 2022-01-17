import Heap from "./Heap";

const compare = (a: number, b: number) => a - b;

describe("测试 Heap", () => {
  test("测试 heap.isEmpty, heap.getHead", () => {
    const heap = new Heap<number>({ compare });

    expect(heap.isEmpty()).toEqual(true);

    heap.insert(0);

    expect(heap.isEmpty()).toEqual(false);

    expect(heap.getHead()).toEqual(0);
  });

  test("测试 heap.insert", () => {
    const heap = new Heap<number>({ compare });

    heap.insert(10010);
    heap.insert(10086);

    expect(heap.isEmpty()).toEqual(false);
    expect(heap.getHead()).toEqual(10010);
    expect(heap.getHead()).toEqual(10010);
  });

  test("测试 heap.pop", () => {
    const heap = new Heap<number>({ compare });
    const nums = [5, 12, 45, 74, 23, 16, 3];
    nums.forEach((n) => {
      heap.insert(n);
    });

    const sortNums: number[] = [];

    nums.forEach(() => {
      const d = heap.pop();
      if (d) sortNums.push(d);
    });

    expect(sortNums).toEqual(nums.sort(compare));
  });

  test("测试 heap.delete", () => {
    const heap = new Heap<number>({ compare });
    const nums = [5, 12, 45, 74, 23, 16, 3];
    nums.forEach((n) => {
      heap.insert(n);
    });

    heap.delete((d) => d === 12);

    const sortNums: number[] = [];

    nums.forEach(() => {
      const d = heap.pop();
      if (d) sortNums.push(d);
    });

    const d1 = [...nums];
    d1.splice(1, 1);

    expect(sortNums).toEqual(d1.sort(compare));
  });
});
