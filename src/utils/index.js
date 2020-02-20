import { noop, get } from "lodash";

export const isMobile = () => {
	// 判断是否为移动端
	const ua = navigator.userAgent;
	const android = /Android (\d+\.\d+)/.test(ua);
	const iphone = ua.indexOf("iPhone") > -1;
	const ipod = ua.indexOf("iPod") > -1;
	const ipad = ua.indexOf("iPad") > -1;
	const nokiaN = ua.indexOf("NokiaN") > -1;
	return android || iphone || ipod || ipad || nokiaN;
};

//  引擎
export const engine = (callback = noop, option = {}) => {
	let flag = true;
	const stop = get(option, "stop", noop);
	const start = get(option, "start", noop);
	start();
	let anonymous = () => {
		if (flag) {
			callback();
			requestAnimationFrame(anonymous);
		} else {
			stop();
			anonymous = null;
		}
	};
	requestAnimationFrame(anonymous);
	return () => {
		flag = false;
	};
};
