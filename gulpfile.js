var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {

    gulp.src('src/content.js')
        .pipe(browserify())
        .pipe(gulp.dest('./dest/js'))

});


gulp.task('default',['scripts'])
