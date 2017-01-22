"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");
var uglify = require("gulp-uglify");
var uncss = require("gulp-uncss");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
var watch = require("gulp-watch");
var rigger = require("gulp-rigger");

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
        js: "./src/js/**/*.js",
        fonts: "./src/fonts/**/*.*",
        images: "./src/img/**/*.*"
    },

    watch: {
        html: "./src/*.html",
        styles: "./src/scss/**/*.scss",
        js: "./src/js/**/*.js",
        fonts: "./src/fonts/**/*.*",
        images: "./src/img/**/*.*"
    }
};

// server
gulp.task("connect", function() {
    connect.server({
        root: "src",
        livereload: true,
        port: 30007
    });
});

// html build
gulp.task("html-build", function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.src.src))
        .pipe(connect.reload());
});

// styles
gulp.task("styles", function() {
    console.log("in styles task");

    return gulp.src(path.src.scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest(path.src.css))
        .pipe(connect.reload());
});

// html
gulp.task("html", function() {
    return gulp.src(path.src.html)
        .pipe(connect.reload());
});

// js
gulp.task("js", function(cb) {
    return gulp.src(path.src.js)
        .pipe(connect.reload());
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
        gulp.start("js")
    });
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

gulp.task("default", ["connect", "watch"]);

