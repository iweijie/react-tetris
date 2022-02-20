/**
 * Promise Capability object.
 *
 * @typedef {Object} PromiseCapability
 * @property {Promise<any>} promise - A Promise object.
 * @property {boolean} settled - If the Promise has been fulfilled/rejected.
 * @property {function} resolve - Fulfills the Promise.
 * @property {function} reject - Rejects the Promise.
 */

/**
 * Creates a promise capability object.
 * @alias createPromiseCapability
 *
 * @returns {PromiseCapability}
 */

type CapabilityType = {
  promise: Promise<any>;
  resolve: (p: any) => any;
  reject: (reason: any) => any;
  settled: boolean;
};

const createPromiseCapability = (): CapabilityType => {
  const capability = Object.create(null);

  let isSettled = false;

  Object.defineProperty(capability, "settled", {
    get() {
      return isSettled;
    },
  });
  capability.promise = new Promise(function (resolve, reject) {
    capability.resolve = function (data: any) {
      isSettled = true;
      resolve(data);
    };
    capability.reject = function (reason: any) {
      isSettled = true;
      reject(reason);
    };
  });
  return capability;
};

export default createPromiseCapability;
