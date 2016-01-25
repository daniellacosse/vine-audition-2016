import gulp from "gulp";

import concat from "gulp-concat";
import connect from "gulp-connect";
import fontmin from "gulp-fontmin";
import imagemin from "gulp-imagemin";
import jpegtran from "imagemin-jpegtran";
import minify_css from "gulp-minify-css";
import minify_html from "gulp-minify-html";
import notify from "gulp-notify";
import packer from "webpack-stream";
import plumber from "gulp-plumber";
import less from "gulp-less";
import sourcemaps from "gulp-sourcemaps";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import webpack from "webpack";

const DESTINATION = "dist";

gulp.task("default", [
  "babel",
  "spritesheet",
  "background",
  "stylesheets",
  "fonts",
  "index",
  "serve"
]);

gulp.task("heroku", ["default"]);

gulp.task("babel", () => {
  return gulp.src(get("index.jsx"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      packer(
        packer_settings()
      )
    )
    .pipe(
      gulp.dest(DESTINATION)
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
    // .pipe(
    //   svgstore()
    // )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

gulp.task("stylesheets", () => {
  return gulp.src("stylesheets/**/*.scss")
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
      concat("index.css")
    )
    .pipe(
      minify_css()
    )
    .pipe(
      sourcemaps.write()
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

gulp.task("background", () => {
    return gulp.src(get_asset("images/background.jpeg"))
        .pipe(
          imagemin({
            progressive: true,
            use: [
              jpegtran()
            ]
          })
        )
        .pipe(
          gulp.dest(DESTINATION)
        );
});

gulp.task("fonts", () => {
  return gulp.src(get_asset("fonts/**/*.woff"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      fontmin()
    )
    .pipe(
      gulp.dest(DESTINATION)
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
      gulp.dest(DESTINATION)
    );
});

gulp.task("serve", () => {
  connect.server({
    root: "dist",
    port: process.env.PORT || 9999,
    livereload: true
  });
});

///\\\///\\\ HELPERS ///\\\///\\\

function packer_settings() {
  return {
    devtool: "source-map",
    watch: true,
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        loader: "babel",
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
          semicolons: true,
        },
      }),
    ],
    output: {
      filename: "index.js"
    }
  };
}

function get(filepath) {
  return `./source/${filepath}`;
}

function get_asset(filepath) {
  return `./assets/${filepath}`;
}

function destination(filename) {
  return (!!filename) ? `./${DESTINATION}` : `./${DESTINATION}/${filename}`;
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
