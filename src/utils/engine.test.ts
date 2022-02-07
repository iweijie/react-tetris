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
    }, 3000);
  });

  test("测试 count", (done) => {
    const engine = new Engine();
    expect.assertions(10);
    engine.addListener({
      HZ: 100,
      count: 10,
      listener: () => {
        expect({}).toBeTruthy();
      },
    });

    engine.start();

    setTimeout(() => {
      done();
    }, 3000);
  });
});
