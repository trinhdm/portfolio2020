const gulp 			= require('gulp'),
	  sass 			= require('gulp-sass'),
	  pug 			= require('gulp-pug'),
	  rename		= require('gulp-rename'),
	  uglify 		= require('gulp-uglify'),
	  plumber		= require('gulp-plumber'),
	  postcss		= require('gulp-postcss'),
	  browserSync   = require('browser-sync').create(),
	  autoprefixer  = require('autoprefixer');

function init() {
	console.log('Hello');
}

function html() {
	return gulp.src('src/pug/**/*.pug')
		.pipe(pug())
		.pipe(plumber())
		.pipe(gulp.dest('dist/'));
}

function css() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compact'
		}))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(bsync.stream())
		.pipe(gulp.dest('dist/css'));
}

function scripts() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/js'))
}

function fonts() {
	return gulp.src('src/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
}

function bsync(done) {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		port: 3000 
	});
	done();
}

function reload() {
	browserSync.reload();
}

function watch() {
	gulp.watch('src/pug/**/*.pug', html).on('change', reload);
	gulp.watch('src/sass/**/*.scss', css).on('change', reload);
	gulp.watch('src/js/**/*.js', scripts).on('change', reload); 
	gulp.watch('src/fonts/*', fonts);

	gulp.watch('dist/*.html', reload);
}

var build = gulp.series(html, css, scripts, fonts),
	watch = gulp.series(gulp.parallel(watch, bsync));

exports.build = build;
exports.watch = watch;
exports.default = watch;