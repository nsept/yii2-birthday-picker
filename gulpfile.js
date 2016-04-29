var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    nano = require('gulp-cssnano');

gulp.task('minjs', function() {
return gulp.src(['./assets/jquery.birthdaypicker.js'])
	.pipe(uglify())
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest('./assets'));
});

gulp.task('mincss', function() {
  return gulp.src(['./assets/jquery.birthdaypicker.css'])
    .pipe(nano())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./assets'));
});


gulp.task('default', ['mincss', 'minjs'], function() {

});

