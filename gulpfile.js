const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');
const minCss = require('gulp-cssmin');
const rename = require('gulp-rename');
// require "name" located in pachage.json

// server
function bs() {
    serveSass();
    serveMinCss();
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    watch("src/*.html").on('change', browserSync.reload);
    watch("src/sass/*.sass", serveSass);
    watch("src/css/*.css", serveMinCss);
};

// sass
function serveSass () {
    return src('src/sass/*.sass')
        .pipe(sass())
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
};

// min-css
function serveMinCss () {
    return src('src/css/*.css')
        .pipe(minCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist'));
};

exports.serve = bs;
// enter "gulp serve"