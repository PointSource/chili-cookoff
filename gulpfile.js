
var del = require('del');
var gulp = require('gulp');
var filter = require('gulp-filter');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var mainBowerFiles = require('main-bower-files');

gulp.task('js', function() {



    var tsResult = tsProject.src()     
      .pipe(ts(tsProject));
    
    return tsResult.js
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('src', '');
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(livereload());
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('resources', function () {
    return gulp.src('src/resources/*.*')
        .pipe(gulp.dest('dist/resources'))
        .pipe(livereload());
});

gulp.task('clean', function(done) {
  del(['dist'], done);
});


gulp.task('css', function() {

  gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});



gulp.task('server', function() {
  connect.server({
    root: 'dist/',
    port: 8889
  });
});

gulp.task('libs', function () {

    gulp.src(mainBowerFiles())
      .pipe(filter('*.js'))
      .pipe(gulp.dest('./dist/lib'));

    return gulp.src([
          'node_modules/angular2/bundles/angular2-polyfills.js',
          'node_modules/systemjs/dist/system.src.js',
          'node_modules/rxjs/bundles/Rx.js',
          'node_modules/angular2/bundles/angular2.dev.js',
          'node_modules/angular2/bundles/router.dev.js',  
          'node_modules/redux/dist/redux.js'  
        ])
      .pipe(gulp.dest('dist/lib'));

});

gulp.task('watch', function() {

  livereload.listen();
  gulp.watch('src/**/*.scss', ['css']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.ts', ['js']);

});

gulp.task('default', [
  'js', 
  'libs', 
  'html', 
  'css', 
  'resources',
  'server',
  'watch'
]);

