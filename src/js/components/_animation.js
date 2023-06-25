import $ from 'jquery';

export default class Animation {
	constructor(el, settings) {
		this.el = el;
		this.animateClass = settings.animateClassName;
		this.offsetPos = settings.offset;
		this.init();
	}

	init() {
		var $animation_elements = $(this.el),
			$window = $(window),
			_this = this;

		function check_if_in_view() {
			var window_height = $window.height(),
				window_top_position = $window.scrollTop(),
				window_bottom_position = (window_top_position + window_height);

			$.each($animation_elements, function () {
				var $element = $(this),
					element_height = $element.outerHeight(),
					element_top_position = $element.offset().top + _this.offsetPos,
					element_bottom_position = (element_top_position + element_height);

				//check to see if this current container is within viewport
				if (element_top_position <= window_bottom_position) {
					$element.addClass(_this.animateClass);
				}
			});
		}

		$window.on('scroll resize', check_if_in_view);
		$window.trigger('scroll');
	}
}

// new Animation('.fade-on-scroll', {
// 	animateClassName: 'animate',
// 	offset: 50,
// });
