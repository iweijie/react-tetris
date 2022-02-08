import { Engine } from "./engine";

describe("测试 Engine", () => {
  test("测试 addListener", (done) => {
    const engine = new Engine();
    expect.assertions(1);
    engine.addListener({
      HZ: 100,
      listener: () => {
        engine.stop();
        expect({}).toBeTruthy();
        done();
      },
    });

    engine.start();
  });

  test("测试 removeListener", (done) => {
    const engine = new Engine();
    expect.assertions(1);
    const remove = engine.addListener({
      HZ: 100,
      listener: () => {
        remove();
        expect({}).toBeTruthy();
      },
    });

    engine.start();

    setTimeout(() => {
      done();
    }, 300);
  });

  test("测试 count", (done) => {
    const engine = new Engine();
    let count = 0;
    const remove = engine.addListener({
      HZ: 100,
      count: 3,
      listener: () => {
        count++;
      },
    });
    engine.start();

    setTimeout(() => {
      remove();
      expect(count).toEqual(3);
      console.log("-----", "iweijie");
      done();
    }, 500);
  });

  test("测试 leading", (done) => {
    const engine = new Engine();
    let count = 0;
    let count1 = 0;
    engine.addListener({
      HZ: 100,
      leading: true,
      listener: () => {
        count++;
      },
    });

    engine.addListener({
      HZ: 100,
      leading: false,
      listener: () => {
        count1++;
      },
    });

    engine.start();

    setTimeout(() => {
      expect(count - count1).toEqual(1);
      done();
    }, 400);
  });

  test("测试 count + leading", (done) => {
    const engine = new Engine();
    let count = 0;
    engine.addListener({
      HZ: 100,
      count: 3,
      leading: true,
      listener: () => {
        count++;
      },
    });

    engine.start();

    setTimeout(() => {
      expect(count).toEqual(3);
      done();
    }, 400);
  });
});
