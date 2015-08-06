var gulp           = require('gulp');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');

gulp.task('scripts',function(){
	return gulp.src('lib/javascripts/*.js')
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts'));
});

gulp.task('bower-scripts',function(){
	return gulp.src(mainBowerFiles('**/*.js'))
		.pipe(concat('helper.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts'));
});

gulp.task('bower-styles',function(){
	return gulp.src(mainBowerFiles('**/*.css'))
		.pipe(concat('helper.min.css'))
		.pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch',function(){
	gulp.watch('scripts');
});

gulp.task('default',['scripts','bower-scripts','bower-styles','watch']);