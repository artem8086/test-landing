const
	path = require('path'),
	fs   = require('fs'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify-es').default,
	clean = require('gulp-clean'),
	rollup = require('gulp-rollup'),
	copy = require('gulp-copy');

const { src, dest, watch, series } = require('gulp');

function assetsT(cb) {
	src('app/data/**/*.*')
		.pipe(copy('dist/', { prefix: 1 }));
	cb();
};

function connectT(cb) {
	connect.server({
		port: 3000,
		livereload: on,
		root: './dist'
	});
	cb();
};

function jadeT(cb) {
	src('app/pages/*.jade')
		.pipe(jade())
			.on('error', console.log)
		.pipe(dest('dist'))
		.pipe(connect.reload());
	cb();
}

function stylusT(cb) {
	src('app/styles/*.styl')
		.pipe(stylus({compress: true}))
			.on('error', console.log)
		.pipe(dest('dist/styles'))
		.pipe(onnect.reload());
	cb();
}

function buildT(cb) {
	src('app/scripts/*.js')
		.pipe(sourcemaps.init())
		.pipe(
			rollup({
				input: 'app/scripts/main.js',
				output: {
					format: 'cjs',
					intro: '(function(){',
					outro: '})();'
				}
			})
		).on('error', console.log)
		.pipe(uglify())
			.on('error', console.log)
		.pipe(sourcemaps.write())
		.pipe(dest('dist/scripts'))
		.pipe(connect.reload());
	cb();
}

function watchT(cb) {
	watch(['app/pages/**/*.jade', 'app/blocks/**/*.jade'], jadeT)
	watch(['app/styles/**/*.styl', 'app/blocks/**/*.styl'], stylusT)
	watch('app/scripts/**/*.js', buildT)
	watch('app/data/**/*.*', assetsT)
	cb();
}

exports.default = series(assetsT, jadeT, stylusT, buildT, connectT, watchT);
