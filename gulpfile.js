'use strict';
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleanCSS())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('build/styles/'))
})

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('build/js/'))
})

gulp.task('html',function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
})

gulp.task('img', function(){
    return gulp.src('src/styles/img/*.{png,jpg,svg}')
        .pipe(gulp.dest('build/styles/img/'))
})

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.{otf,ttf,woff,woff2,eot}')
        .pipe(gulp.dest('build/fonts/'))
})

gulp.task('assets', function(){
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets/'))
})

gulp.task('server',['build'], function () {
    browserSync.init({
        server: 'build'
    });

    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});



gulp.task('watch',['build'], function () {
    gulp.watch('src/*.html',['html']);
    gulp.watch(['src/styles/**/*.scss', 'src/styles/**/*.css'],['styles']);
    gulp.watch(['src/js/**/*.js'],['js']);
    gulp.watch('src/assets/**/*.*', ['assets']);
    gulp.watch('src/styles/img/*.{png,jpg,svg}', ['img']);
});


gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('build', ['styles', 'html', 'js', 'img', 'fonts', 'assets'])

gulp.task('dev', ['clean'], function(){
    gulp.start(['server','watch']);
})


gulp.task('default', function () {
    // place code for your default task here
});