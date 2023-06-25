import Cookies from 'js-cookie'

class Cookie {
	constructor(cookieBarSelector = '.cookie', acceptCookieButtonSelector = '.cookie-btn') {
		this.cookieBar = document.querySelector(cookieBarSelector)
		this.acceptCookieButton = document.querySelector(acceptCookieButtonSelector)
		this.init()
	}

	init() {
		if (!this.isCookieSet()) {
			this.showCookieBar()
			this.acceptCookieButton.addEventListener('click', this.acceptCookie.bind(this))
		}
	}

	isCookieSet() {
		return Cookies.get('cookie') !== undefined
	}

	setCookie() {
		Cookies.set('cookie', true, { expires: 7, path: '/'})
	}

	showCookieBar() {
		this.cookieBar.classList.add('cookie--visible')
	}

	hideCookieBar() {
		this.cookieBar.classList.remove('cookie--visible')
	}

	acceptCookie(event) {
		event.preventDefault()
		this.setCookie()
		this.hideCookieBar()
	}
}

export default Cookie
