var gulp = require('gulp')
var del = require('del')
var browserify = require('browserify')
var source = require('vinyl-source-stream')


gulp.task('clean',function(){
    del('./dist')
})

gulp.task('copy', ['clean'], function(){
    gulp.src(['src/app/img/*','src/app/svg/*','src/app/index.html'], {base:'./src'})
        .pipe(gulp.dest('./dist/'))

    gulp.src(['src/**/*','!src/app/**','!src/**/*.js'])
        .pipe(gulp.dest('./dist'))

    gulp.src(['icon16.png','icon48.png','icon128.png'])
        .pipe(gulp.dest('./dist'))
})

gulp.task('client', function() {

    var entry = ['content.js','background.js']

    entry.forEach(function(e){
        browserify('src/' + e)
        .transform('babelify')
        .bundle()
        .pipe(source(e))
        .pipe(gulp.dest('./dist'))
    })
})

gulp.task('aside', function(){
    return browserify('./src/app/main.js')
        .transform('babelify')
        .transform('vueify')
        .bundle()
        .on('error', function(err){
            console.log(err)
            this.emit('end')
        })
        .pipe(source('built.js'))
        .pipe(gulp.dest('./dist/app'))
})



gulp.task('default',['copy', 'client', 'aside'])
