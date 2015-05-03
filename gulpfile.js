var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  console.log('omgwtf');
});

gulp.task('compile', function() {
  gulp.src('./src/*.cjsx')
    .pipe(cjsx())
    .pipe(gulp.dest('./public/'))
    .pipe(livereload())
    .on('error', console.log);
});

gulp.task('reload', function() {
  gulp.src('./public/*').pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/*.cjsx',    ['compile'])
  gulp.watch('./public/*.html', ['reload'])
  gulp.watch('./public/*.css',  ['reload'])
});
