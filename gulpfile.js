var gulp = require('gulp')
var del = require('del')
var browserify = require('browserify')
var source = require('vinyl-source-stream')


gulp.task('clean:init',function(){
    del('./dist')
})

gulp.task('client', ['clean:init'], function() {
    var entry = ['content.js','background.js']

    entry.forEach(function(e){
        browserify('src/' + e)
        .transform('babelify')
        .bundle()
        .pipe(source(e))
        .pipe(gulp.dest('./dist'))
    })


    gulp.src(['src/main.html'])
        .pipe(gulp.dest('./dist/app'))
    gulp.src(['src/manifest.json'])
        .pipe(gulp.dest('./dist'))
    gulp.src(['src/vendor/*'])
        .pipe(gulp.dest('./dist/vendor'))
    gulp.src(['src/svg/*'])
        .pipe(gulp.dest('./dist/svg'))
    gulp.src(['src/css/*'])
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('aside', function(){
    gulp.src('src/app/index.html')
        .pipe(gulp.dest('./dist/app'))

    gulp.src('src/app/svg/*')
        .pipe(gulp.dest('./dist/app/svg'))

    gulp.src('src/app/img/*')
        .pipe(gulp.dest('./dist/app/img'))

    return browserify('./src/app/main.js')
        .transform('babelify')
        .transform('vueify')
        .bundle()
        .on('error', function(err){
            console.log(err.stack)
            this.emit('end')
        })
        .pipe(source('built.js'))
        .pipe(gulp.dest('./dist/app'))
})





gulp.task('default',['client','aside'])
