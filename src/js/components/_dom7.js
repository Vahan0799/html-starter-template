import {
	$ as $$,
	addClass,
	removeClass,
	toggleClass,
	hasClass,
	val,
	on,
	once,
	focus,
	prop,
	data,
	siblings,
	show,
	hide,
	each,
	width,
	appendTo,
	prependTo,
	text,
	append,
	is,
	attr,
	css,
	find,
	parents,
	trigger,
	scrollTop,
	html
} from 'dom7';

let slideUp = function (duration = 500) {
	this.forEach((element) => {
		element.style.transitionProperty = 'height, margin, padding';
		element.style.transitionDuration = duration + 'ms';
		element.style.boxSizing = 'border-box';
		element.style.height = element.offsetHeight + 'px';
		element.offsetHeight;
		element.style.overflow = 'hidden';
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		window.setTimeout(() => {
			element.style.display = 'none';
			element.style.removeProperty('height');
			element.style.removeProperty('padding-top');
			element.style.removeProperty('padding-bottom');
			element.style.removeProperty('margin-top');
			element.style.removeProperty('margin-bottom');
			element.style.removeProperty('overflow');
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-property');
		}, duration);
	});
	return this;
};

let slideDown = function (duration = 500) {
	this.forEach((element) => {
		element.style.removeProperty('display');
		let display = window.getComputedStyle(element).display;

		if (display === 'none') display = 'block';

		element.style.display = display;
		let height = element.offsetHeight;
		element.style.overflow = 'hidden';
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		element.offsetHeight;
		element.style.boxSizing = 'border-box';
		element.style.transitionProperty = 'height, margin, padding';
		element.style.transitionDuration = duration + 'ms';
		element.style.height = height + 'px';
		element.style.removeProperty('padding-top');
		element.style.removeProperty('padding-bottom');
		element.style.removeProperty('margin-top');
		element.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			element.style.removeProperty('height');
			element.style.removeProperty('overflow');
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-property');
		}, duration);
	});
	return this;
};

let slideToggle = function (duration = 500) {
	if (window.getComputedStyle(this[0]).display === 'none') {
		this.slideDown(duration);
	} else {
		this.slideUp(duration);
	}
	return this;
};

let fadeIn = function (duration = 400) {
	let ms = duration;

	this.forEach((element) => {
		if (window.getComputedStyle(element).display === 'none') {
			element.style.opacity = 0;
			element.style.filter = 'alpha(opacity=0)';
			element.style.display = 'block';

			var opacity = 0;
			var timer = setInterval(() => {
				opacity += 50 / ms;
				if (opacity >= 1) {
					clearInterval(timer);
					opacity = 1;
				}
				element.style.opacity = opacity;
				element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
			}, 50);
		}
	});

	return this;
};

let fadeOut = function (duration = 400) {
	let ms = duration;
	this.forEach((element) => {
		if (window.getComputedStyle(element).display === 'block') {
			var opacity = 1;
			var timer = setInterval(() => {
				opacity -= 50 / ms;
				if (opacity <= 0) {
					clearInterval(timer);
					opacity = 0;
					element.style.display = 'none';
				}
				element.style.opacity = opacity;
				element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
			}, 50);
		}
	});
	return this;
};

let fadeToggle = function (duration = 400) {
	let ms = duration;
	this.forEach((element) => {
		if (window.getComputedStyle(element).display === 'none') {
			this.fadeIn();
		} else {
			this.fadeOut();
		}
	});
	return this;
};

$$.fn.slideUp = slideUp;
$$.fn.slideDown = slideDown;
$$.fn.slideToggle = slideToggle;
$$.fn.fadeIn = fadeIn;
$$.fn.fadeOut = fadeOut;
$$.fn.fadeToggle = fadeToggle;
$$.fn.on = on;
$$.fn.addClass = addClass;
$$.fn.removeClass = removeClass;
$$.fn.toggleClass = toggleClass;
$$.fn.once = once;
$$.fn.hasClass = hasClass;
$$.fn.val = val;
$$.fn.focus = focus;
$$.fn.prop = prop;
$$.fn.data = data;
$$.fn.siblings = siblings;
$$.fn.show = show;
$$.fn.hide = hide;
$$.fn.each = each;
$$.fn.width = width;
$$.fn.appendTo = appendTo;
$$.fn.prependTo = prependTo;
$$.fn.text = text;
$$.fn.append = append;
$$.fn.is = is;
$$.fn.attr = attr;
$$.fn.css = css;
$$.fn.parents = parents;
$$.fn.find = find;
$$.fn.trigger = trigger;
$$.fn.scrollTop = scrollTop;
$$.fn.html = html;