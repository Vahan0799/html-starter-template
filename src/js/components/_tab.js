import {debounce} from './_utilities';

export default class Tab {
	constructor(options) {
		this.elem = document.getElementById(options.elem);
		this.open = options.open || false;
		this.tabNavClass = options.tabnavclass;
		this.activeClass = options.activeclass;
		this.tabContentClass = options.tabcontentclass;
		this.tabsNum = this.elem ? this.elem.querySelectorAll(this.tabNavClass).length : 0;
		if(this.tabsNum) {
			this.render();
		}
	}

	render(n) {
		this.setMaxHeightParentWrapper();
		this.elem.addEventListener('click', this.onClick.bind(this));
		let init = n == null ? this.checkTab(open) : this.checkTab(n);
		for (var i = 0; i < this.tabsNum; i++) {
			this.elem.querySelectorAll(this.tabNavClass)[i].setAttribute('data-index', i);
			if (i === init) this.openTab(i);
		}

		window.addEventListener('resize', debounce(this.setMaxHeightParentWrapper.bind(this), 300))
	}

	onClick(e) {
		if (e.target.className.indexOf(this.tabNavClass.replace('.', '')) === -1) return;
		e.preventDefault();
		this.openTab(e.target.getAttribute('data-index'));
	}

	reset() {
		let _this = this;

		[].forEach.call(this.elem.querySelectorAll(this.tabContentClass), function (item) {
			item.style.display = 'none';
		});

		[].forEach.call(this.elem.querySelectorAll(this.tabNavClass), function (item) {
			item.className = _this.removeClass(item.className, _this.activeClass);
		});
	}

	removeClass(str, cls) {
		let reg = new RegExp('( )' + cls + '()', 'g');
		return str.replace(reg, '');
	}

	checkTab(n) {
		return n < 0 || isNaN(n) || n > this.tabsNum ? 0 : n;
	}

	maxTabItemHeight() {
		let initialHeight = 0;
		document.querySelectorAll(this.tabContentClass).forEach((item) => {
			let currentHeight = item.scrollHeight;

			if (currentHeight > initialHeight) {
				initialHeight = currentHeight;
			}
		});
		return initialHeight;
	}

	setMaxHeightParentWrapper() {
		let elemHeight = this.maxTabItemHeight();
		let getParentHeight = document.querySelector(this.tabContentClass).parentElement,
			spacingTop = parseFloat(window.getComputedStyle(getParentHeight).paddingTop),
			spacingBottom = parseFloat(window.getComputedStyle(getParentHeight).paddingBottom),
			caculateParentSpacing = spacingTop + spacingBottom;

		getParentHeight.style.minHeight = `${elemHeight + caculateParentSpacing}px`;
	}

	openTab(n) {
		this.reset();
		let i = this.checkTab(n);
		this.elem.querySelectorAll(this.tabNavClass)[i].className += ' ' + this.activeClass;
		this.elem.querySelectorAll(this.tabContentClass)[i].style.display = '';
	}
}

// new Tab({
// 	elem: 'section_ID',
// 	tabnavclass: '.howItWorks__tabs-button',
// 	tabcontentclass: '.howItWorks__tabs-content',
// 	activeclass: 'active',
// })