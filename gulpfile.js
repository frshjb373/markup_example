var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    cleanCSS = require('gulp-clean-css');
    sourcemaps = require('gulp-sourcemaps');
    livereload = require('gulp-livereload');

var jsSources = [
        'assets/src_assets/js/mc2_script.js',
        'assets/src_assets/js/minical.js',
        'assets/src_assets/js/packs/*.js',
        'assets/src_assets/js/fontawesome.js'
        
    ],
    sassSources = [
        'assets/src_assets/scss/styles.scss',
        'assets/src_assets/scss/solspace_calendar.scss'
        
    ],
    sassDir = [
        'assets/src_assets/scss/**/*.scss'
    ],
    htmlSources = ['**/*.html'],
    jsDir = 'assets/js';
    cssDir = 'assets/css';



// gulp sass
function sassFiles() {
  return gulp
    .src(sassSources)
    .pipe(sourcemaps.init())
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(cleanCSS())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(cssDir))
    .pipe(livereload());
}

// gulp js
function jsFiles() {
  return gulp
    .src(jsSources)
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(jsDir))
    .pipe(livereload());
}


// Watch files
function watch() {
    livereload.listen();
    gulp.watch(jsSources, jsFiles);
    gulp.watch(sassSources, sassFiles);
    gulp.watch(sassDir, sassFiles);
}

gulp.task('default', gulp.parallel(jsFiles, sassFiles, watch));