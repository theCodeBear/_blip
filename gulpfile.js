var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    copy = require('gulp-copy'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject');

var paths = {
  sass: './app/scss/**/*.scss',
  javascript: './app/**/*.js',
  all: './app/**/*'
};

// DEFAULT
gulp.task('default', ['sass', 'javascript', 'clean', 'copy', 'inject']);

// WATCH
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.javascript, ['javascript']);
  gulp.watch(paths.all, ['copy']);
  gulp.watch('paths.javascript', ['jshint']);
});

// check javascript for syntax errors/warnings
gulp.task('jshint', function() {
  return gulp.src(paths.javascript)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// convert sass to css and move to www folder
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./www/css'));
    // .pipe(minifyCss({
    //   keepSpecialComments: 0
    // }))
    // .pipe(rename({ extname: '.min.css' }))
    // .pipe(gulp.dest('./www/css/'));
});

// empty www folder except for css
gulp.task('clean', function() {
  // return gulp.src('www/js/index.js')
  //   .pipe(clean());
  return gulp.src(['./www/**/*', '!./www/css', '!./www/css/**/*.css', '!./www/lib', '!./www/lib/**/*'])
    .pipe(clean());
});

// copy all contents of app folder to www folder
gulp.task('copy', ['clean'], function() {
  return gulp.src([paths.all, '!./app/scss/**/*.scss'])
    .pipe(copy('./www', { prefix: 1}));
});

gulp.task('javascript', function() {
    // .pipe(concat('index.js'))
    // .pipe(gulp.dest('./www/js'));
});

gulp.task('inject', ['copy', 'sass'], function() {
  return gulp.src('./www/index.html')
    .pipe(inject(
      gulp.src(['./www/**/*.js', '!./www/lib/**/*.js', './www/css/**/*.css'], {read: false}),
      {relative: true}
    ))
    .pipe(gulp.dest('./www'));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
