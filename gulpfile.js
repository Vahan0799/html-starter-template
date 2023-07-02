'use strict';

const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const panini = require('panini');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const notify = require('gulp-notify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();

/* Paths */
const srcPath = 'src/';
const distPath = 'build/';
const extraPath = 'shopify/assets/';

const config = {
	shape: {
		spacing: {
			padding: 1,
		},
	},
	mode: {
		view: {
			// Activate the «view» mode
			bust: false,
			render: {
				scss: true, // Activate Sass output (with default options)
			},
		},
		symbol: true, // Activate the «symbol» mode
	},
};

const path = {
	build: {
		html: distPath,
		js: distPath + 'assets/js/',
		css: distPath + 'assets/css/',
		images: distPath + 'assets/images/',
		fonts: distPath + 'assets/fonts/',
		svgs: distPath + 'assets/svgs/',
	},
	src: {
		html: srcPath + '/views/*.html',
		js: srcPath + 'js/*.js',
		css: srcPath + 'scss/*.scss',
		images: srcPath + 'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
		fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
		svgs: srcPath + 'assets/svgs/**/*.svg',
	},
	watch: {
		html: srcPath + 'views/**/*.html',
		js: srcPath + 'js/**/*.js',
		css: srcPath + 'scss/**/*.scss',
		images: srcPath + 'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
		fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
		svgs: srcPath + 'assets/svgs/**/*.svg',
	},
	clean: './' + distPath,
};

/* Tasks */
function serve() {
	browserSync.init({
		server: {
			baseDir: './' + distPath,
		},
		port: 3000,
		ui: false
	});
}

function html(cb) {
	const rootHtml = srcPath + 'views/';
	panini.refresh();
	return src(path.src.html, { base: rootHtml })
		.pipe(plumber())
		.pipe(
			panini({
				root: rootHtml,
				layouts: rootHtml + 'layouts/',
				partials:[rootHtml + 'partials/', rootHtml + 'sections'],
				helpers: rootHtml + 'helpers/',
				data: rootHtml + 'data/',
			})
		)
		.pipe(dest(path.build.html))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function css(cb) {
	return (
		src(path.src.css, { base: srcPath + 'assets/scss/' })
			.pipe(
				plumber({
					errorHandler: function (err) {
						notify.onError({
							title: 'SCSS Error',
							message: 'Error: <%= error.message %>',
						})(err);
						this.emit('end');
					},
				})
			)
			.pipe(
				sass({
					includePaths: './node_modules/',
				})
			)
			.pipe(
				autoprefixer({
					cascade: true,
				})
			)
			.pipe(cssbeautify())
			// .pipe(dest(path.build.css))
			.pipe(
				cssnano({
					zindex: false,
					discardComments: {
						removeAll: true,
					},
				})
			)
			.pipe(removeComments())
			.pipe(rename('custom.min.css'))
			.pipe(dest(path.build.css))
			// .pipe(dest(extraPath))
			.pipe(browserSync.reload({ stream: true }))
	);

	cb();
}

function cssWatch(cb) {
	return src(path.src.css, { base: srcPath + 'assets/scss/' })
		.pipe(sourcemaps.init())
		.pipe(
			plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'SCSS Error',
						message: 'Error: <%= error.message %>',
					})(err);
					this.emit('end');
				},
			})
		)
		.pipe(
			sass({
				includePaths: './node_modules/',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(rename('custom.min.css'))
		// .pipe(dest(extraPath))
		.pipe(dest(path.build.css))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function js(cb) {
	return src(path.src.js, { base: srcPath + 'assets/js/' })
		.pipe(
			plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'JS Error',
						message: 'Error: <%= error.message %>',
					})(err);
					this.emit('end');
				},
			})
		)
		.pipe(
			webpackStream({
				mode: 'production',
				output: {
					filename: 'custom.min.js',
				},
				performance: {
					hints: false,
					maxEntrypointSize: 2000,
					maxAssetSize: 2000
				},
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							loader: 'babel-loader',
							query: {
								presets: ['@babel/preset-env'],
							},
						},
					],
				},
			})
		)
		// .pipe(dest(extraPath))
		.pipe(dest(path.build.js))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function jsWatch(cb) {
	return src(path.src.js, { base: srcPath + 'assets/js/' })
		.pipe(
			plumber({
				errorHandler: function (err) {
					notify.onError({
						title: 'JS Error',
						message: 'Error: <%= error.message %>',
					})(err);
					this.emit('end');
				},
			})
		)
		.pipe(
			webpackStream({
				mode: 'development',
				output: {
					filename: 'custom.min.js',
				},
				performance: {
					hints: false,
					maxEntrypointSize: 2000,
					maxAssetSize: 2000
				}
			})
		)
		// .pipe(dest(extraPath))
		.pipe(dest(path.build.js))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function images(cb) {
	return src(path.src.images)
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 80, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest(path.build.images))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function fonts(cb) {
	return src(path.src.fonts)
		// .pipe(dest(extraPath))
		.pipe(dest(path.build.fonts))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function clean(cb) {
	return del(path.clean);

	cb();
}

function buildSvg(cb) {
	return gulp.src(path.src.svgs, { cwd: path.build }).pipe(svgSprite(config)).pipe(gulp.dest(path.build.svgs));
	cb();
}

function copyShapes(cb) {
	return gulp.src('src/assets/static-svgs/**/*').pipe(gulp.dest('./build/assets/static-svgs/'));
}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], cssWatch);
	gulp.watch([path.watch.js], jsWatch);
	gulp.watch([path.watch.images], images);
	gulp.watch('src/assets/static-svgs', copyShapes);
	gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, copyShapes));
const watch = gulp.parallel(html, css, js, images, fonts, buildSvg, copyShapes, watchFiles, serve);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;