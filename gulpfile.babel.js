import gulp from "gulp";

import babel from "gulp-babel";
import concat from "gulp-concat";
import connect from "gulp-connect";
import fontmin from "gulp-fontmin";
import less from "gulp-less";
import minify_css from "gulp-minify-css";
import minify_html from "gulp-minify-html";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import uglify from "gulp-uglify";

const DESTINATION = "dist";

gulp.task("default", [
  "babel",
  "spritesheet",
  "stylesheets",
  "fonts",
  "index",
  "serve",
  "watch"
]);

gulp.task("babel", () => {
  return gulp.src(get("**/*.+(js|jsx)"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      sourcemaps.init()
    )
    .pipe(
      babel({ presets: ["es2015"] })
    )
    .pipe(
      concat("app.js")
    )
    .pipe(
      uglify()
    )
    .pipe(
      sourcemaps.write()
    )
    .pipe(
      gulp.dest(destination())
    );
});

gulp.task("spritesheet", () => {
  return gulp.src(get_asset("images/*.svg"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      svgmin()
    )
    .pipe(
      svgstore()
    )
    .pipe(
      gulp.dest(destination("spritesheet.svg"))
    );
});

gulp.task("stylesheets", () => {
  return gulp
    .src(
      get_asset("stylesheets/*.less")
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      sourcemaps.init()
    )
    .pipe(
      less()
    )
    .pipe(
      concat("app.css")
    )
    .pipe(
      minify_css()
    )
    .pipe(
      sourcemaps.write()
    )
    .pipe(
      gulp.dest(destination())
    );
});

gulp.task("fonts", () => {
  return gulp.src(get_asset("fonts/*.woff"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      fontmin()
    )
    .pipe(
      gulp.dest(destination())
    );
});

gulp.task("index", () => {
  return gulp.src(get("index.html"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      minify_html()
    )
    .pipe(
      gulp.dest(destination())
    );
});

gulp.task("serve", () => {
  connect.server(
    {
      root: "dist",
      port: process.env.PORT || 9999,
      livereload: true
    }
  );
});

gulp.task("watch", () => {

});

function get(filepath) {
  return `./source/${filepath}`;
}

function get_asset(filepath) {
  return `./assets/${filepath}`;
}

function destination(filepath) {
  return `./${DESTINATION}/${filepath}`;
}

function handle_error() {
  notify
    .onError({
      title: "Compiler Error",
      message: "<%= error.message %>"
    })
    .apply(this, Array.prototype.slice.call(arguments));

  this.emit("end"); // Keep gulp from hanging on this task
}
