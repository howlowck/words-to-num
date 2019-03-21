const gulp = require('gulp')
const browserify = require('gulp-browserify')
const livereload = require('gulp-livereload')
const lr = require('tiny-lr')
const server = lr()

gulp.task('browserify', function () {
  gulp.src('./public/js/*.js')
    .pipe(browserify(
      {
        standalone: 'WtoN'
      }
    ))
    .pipe(gulp.dest('./public/js/build'))
    .pipe(livereload(server))

  gulp.src('./public/js/tests/*.js')
    .pipe(browserify())
    .pipe(gulp.dest('./public/js/tests/build'))
    .pipe(livereload(server))
})

gulp.task('default', function () {
  gulp.run('browserify')
  server.listen(35729, function (error) {
    if (error) {}
    gulp.watch(['./public/js/**/*.js', '!./public/js/build/**/*'], function () {
      gulp.run('browserify')
    })
  })
})
