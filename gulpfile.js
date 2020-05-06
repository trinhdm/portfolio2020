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
	return gulp.src('fonts/**/*')
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

function browserSyncReload(done) {
	bsync.reload();
	done();
}

function watch() {
	gulp.watch('src/pug/**/*.pug', html);
	gulp.watch('src/sass/**/*.scss', css);
	gulp.watch('src/js/**/*.js', scripts); 
	gulp.watch('fonts/**/*', fonts);

	gulp.watch('dist/**/*', browserSyncReload);
}

var build = gulp.series(html, css, scripts),
	watch = gulp.series(gulp.parallel(watch, bsync));

exports.build = build;
exports.watch = watch;
exports.default = watch;