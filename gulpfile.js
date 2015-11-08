var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');


gulp.task('client', function() {

    gulp.src(['src/content.js'])
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('background',function(){
    gulp.src(['src/rating.js'])
        .pipe(browserify())
        .pipe(gulp.dest('./dist/js'))
})


gulp.task('default',['client','background'])
