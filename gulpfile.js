(function() {

  /* globals require, console */

  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var del = require('del');
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  gulp.task('clean', function(cb) {
    del(['buld'], cb);
  });

  gulp.task('vulcanize', function() {
    return gulp.src('src/carbon.html')
      .pipe($.vulcanize({
        stripComments: true,
        inlineCss: true,
        inlineScripts: true
      }))
      .on('error', function(e) {
        console.log(e);
      })
      .pipe($.minifyInline())
      .pipe($.crisper({
        scriptInHead: false,
        onlySplit: false
      }))
      .pipe(gulp.dest('build'))
      .pipe($.size({title: 'vulcanize'}));
  });

  gulp.task('lint', function() {
    return gulp.src([
      'src/**/*.js',
      'src/**/*.html',
      'gulpfile.js',
      ])
      .pipe(reload({
        stream: true,
        once: true
      }))
    .pipe($.if('*.html', $.htmlExtract()))
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });

  gulp.task('watch', function() {
    gulp.watch(
      ['src/**/*.js'],
      ['build']
    );
    runSequence('build');
  });

  gulp.task('build', function(cb) {
    runSequence(
      'lint',
      'clean',
      'vulcanize',
      cb
    );
  });

  gulp.task('default', ['build']);

}());
