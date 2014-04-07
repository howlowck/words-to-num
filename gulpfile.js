var gulp = require('gulp'),
    util = require('gulp-util'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

gulp.task('browserify', function () {
    gulp.src('./public/js/*.js')
        .pipe(browserify(
          {
            standalone: 'WtoN'
          }
        ))
        .pipe(gulp.dest('./public/js/build'))
        .pipe(livereload(server));

    gulp.src('./public/js/tests/*.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/js/tests/build'))
        .pipe(livereload(server));
});

gulp.task('default', function () {
    gulp.run('browserify');
    server.listen(35729, function (error) {
        gulp.watch(['./public/js/**/*.js', '!./public/js/build/**/*'], function () {
            gulp.run('browserify');
        });
    });
});
