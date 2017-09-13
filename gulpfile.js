var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var javascriptFiles = [
	'./app.js',
	'./workouts/define.js',
	'./workouts/log.js',
	'./user/auth.js'
];

gulp.task('bundle', function(){
	return gulp.src(javascriptFiles)
		.pipe(concat('bundle.js')) // Squish all files together into one file
		.pipe(uglify())
		.pipe(gulp.dest("./dist")); // Save the bundle.js
});

gulp.task('watch', function(){
	gulp.watch(javascriptFiles, ['bundle']);
});


//default task when 'gulp' runs: bundle, starts web server, then watches for changes
gulp.task('default', ['bundle', 'watch']);

