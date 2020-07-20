"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp.src("./source/sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./source/css"))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task("serve", function() {
    browserSync.init({
    server: "./source",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("source/*.html").on("change", browserSync.reload);
});

// gulp.task("fonts", function () {
//   return gulp.src("source/fonts/*.{woff,woff2}")
//     .pipe(plumber())
//     .pipe(gulp.dest("build/fonts"));
// });

gulp.task("style", done => {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(browserSync.stream());

    done();
});