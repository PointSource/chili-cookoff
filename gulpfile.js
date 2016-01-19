
var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('js', function() {
    var tsResult = tsProject.src()     
      .pipe(ts(tsProject));
    
    return tsResult.js
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('src', '');
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(done) {
  del(['dist'], done);
});


gulp.task('css', function() {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});


gulp.task('server', function() {
  connect.server({
    root: 'dist/',
    port: 8889
  });
});

gulp.task('libs', function () {
    return gulp.src([
          'node_modules/angular2/bundles/angular2-polyfills.js',
          'node_modules/systemjs/dist/system.src.js',
          'node_modules/rxjs/bundles/Rx.js',
          'node_modules/angular2/bundles/angular2.dev.js',
          'node_modules/angular2/bundles/router.dev.js'   
        ])
      .pipe(gulp.dest('dist/lib'));
});

gulp.task('default', [
  'js', 'libs', 'html', 
  'css', 
  'server'
  ]);

