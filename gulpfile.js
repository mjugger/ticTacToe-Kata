var gulp           = require('gulp');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var karmaRunner    = require('karma').Server;

gulp.task('karmaJasmine-test',function(done){
	new karmaRunner({
		configFile: __dirname + '/karma.config.js',
		singleRun:false
	},done).start();
});

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
	gulp.watch('lib/javascripts/*.js',['scripts']);
});

gulp.task('default',gulp.series('scripts','bower-scripts','karmaJasmine-test','bower-styles','watch'));
