export default class Accordion {
	constructor(options) {
		this.element = typeof options.element == 'string' ? document.querySelectorAll(options.element) : option.element;
		this.openTab = options.openTab;
		this.oneOpen = options.oneOpen || false;
		this.delay = options.delay || 400;
		this.titleClass = options.head;
		this.contentClass = options.body;
		this.options = options;
		this.render();
	}

	render() {
		// attach only one click listener
		[].forEach.call(document.querySelectorAll(this.titleClass), (accordion) => {
			accordion.addEventListener('click', this.onClick.bind(this));
		})

		// accordion starts with all tabs closed
		this.closeAll();

		// sets the open tab - if defined
		if (this.openTab) {
			this.open(this.openTab);
		}

		if (this.options.callback) {
			this.options.callback.call(this);
		}
	}

	onClick(e) {
		let targetElem = e.target,
			accItem = targetElem.closest(this.options.element),
			content = accItem.querySelector(this.titleClass).nextElementSibling,
			isHiddenContent = content.style.height !== '0px' && content.style.height !== '',
			isAccbody = targetElem.closest(this.contentClass);

		if (isHiddenContent && !isAccbody) {
			content.style.height = 0;
			content.closest(this.options.element).classList.remove(this.options.activeClass);
			content.closest(this.options.element).classList.remove('delay');
		}

		if (this.oneOpen) {
			this.closeAll();
		}

		this.toggle(content);
	}

	replaceClassWithEmptyDot(className) {
		return className.replace('.', '');
	}


	closeAll() {
		[].forEach.call(document.querySelectorAll(this.contentClass), (item) => {
			item.style.height = 0;
			item.closest(this.options.element).classList.remove(this.options.activeClass);
			item.closest(this.options.element).classList.remove('delay');
		})
	};

	toggle(el) {
		let height = el.scrollHeight;
		if (window.getComputedStyle(el).height === '0px') {
			el.style.height = height + 'px';
			el.closest(this.options.element).classList.add(this.options.activeClass);
			setTimeout(() => {
				el.closest(this.options.element).classList.add('delay');
			}, this.delay)
		} else {
			el.style.height = 0;
			el.closest(this.options.element).classList.remove('delay');
			el.closest(this.options.element).classList.remove(this.options.activeClass);
		}
	};


	getTarget(n) {
		return this.element[n - 1];
	}

	open(n) {
		var target = this.getTarget(n);

		if (target) {
			if (this.oneOpen) this.closeAll();
			target.children[1].style.height = target.querySelector(this.contentClass).scrollHeight + 'px';
			target.closest(this.options.element).classList.add(this.options.activeClass);
			setTimeout(() => {
				target.closest(this.options.element).classList.add('delay');
			}, this.delay)
		}
	}

	close(n) {
		let target = getTarget(n);

		if (target) {
			target.querySelector(this.options.contentClass).style.height = 0;
			target.closest(this.options.element).classList.remove(this.options.activeClass);
			target.closest(this.options.element).classList.remove('delay');
		}
	}

	destroy() {
		this.element.removeEventListener('click', this.onClick);
	}
}

// new Accordion({
// 	element: '.accordion',
// 	head: '.accordion__head',
// 	body: '.accordion__body',
// 	activeClass: 'open',
// 	oneOpen: true,
// })