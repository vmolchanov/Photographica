"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var uncss = require("gulp-uncss");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var watch = require("gulp-watch");
var rigger = require("gulp-rigger");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var config = {
    server: {
        baseDir: "./src"
    },
    tunnel: "photographica",
    host: "localhost",
    port: 30007,
    logPrefix: "photographica"
};

var path = {

    build: {
        html: "./build",
        styles: "./build/css",
        js: "./build/js",
        fonts: "./build/fonts",
        images: "./build/img"
    },

    src: {
        src: "./src",
        html: "./src/*.html",
        scss: "./src/scss/style.scss",
        css: "./src/css",
        js: "./src/js/main.js",
        fonts: "./src/fonts/**/*.*",
        images: "./src/img/**/*.*"
    },

    watch: {
        html: "./src/*.html",
        styles: "./src/scss/**/*.scss",
        js: "./src/js/**/*.js",
        fonts: "./src/fonts/**/*.*",
        images: "./src/img/**/*.*"
    },

    clean: "./build"
};

gulp.task("connect", function () {
    browserSync(config);
});

// html build
gulp.task("html-build", function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.src.src))
        .pipe(reload({ stream: true }));
});

// styles
gulp.task("styles", function() {
    return gulp.src(path.src.scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.src.css))
        .pipe(reload({ stream: true }));
});

// html
gulp.task("html", function() {
    return gulp.src(path.src.html)
        .pipe(reload({ stream: true }));
});

// js
gulp.task("js", function(cb) {
    return gulp.src(path.src.js)
        .pipe(reload({ stream: true }));
});

// images
gulp.task("images", function () {
    gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.images));
});

// fonts
gulp.task("fonts", function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// watch
gulp.task("watch", function() {
    watch([path.watch.html], function (event, cb) {
        gulp.start("html")
    });
    watch([path.watch.styles], function (event, cb) {
        gulp.start("styles");
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start("js");
    });
});

// clean
gulp.task("clean", function() {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

// build
gulp.task("build", function() {
    return gulp.src(path.src.html)
        .pipe(useref())
        .pipe(gulpif("js/**/*.js", uglify()))
        .pipe(gulpif("css/**/*.css", cleanCSS()))
        .pipe(gulpif("css/**/*.css", uncss({
            html: [path.src.html]
        })))
        .pipe(gulp.dest(path.build.html));
});

gulp.task("full-build", ["clean", "build", "images", "fonts"]);

gulp.task("default", ["connect", "watch"]);

