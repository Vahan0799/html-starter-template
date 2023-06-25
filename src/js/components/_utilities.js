export const debounce = (fn, delay = 300) => {
	let timeOutId;

	return (...args) => {
		if (timeOutId) {
			clearTimeout(timeOutId);
		}
		timeOutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

export const throttle = (callback, limit) => {
	let waiting = false;

	return function () {
		if (!waiting) {
			callback.apply(this, arguments);
			waiting = true;
			setTimeout(function () {
				waiting = false;
			}, limit);
		}
	};
}