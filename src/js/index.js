import LazyLoad from 'vanilla-lazyload';
import Global from './modules/_global';

window.addEventListener('DOMContentLoaded', function () {
	new LazyLoad()
	new Global()
})