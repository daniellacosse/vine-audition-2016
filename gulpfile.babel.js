import gulp from "gulp";

import concat from "gulp-concat";
import connect from "gulp-connect";
import fontmin from "gulp-fontmin";
import imagemin from "gulp-imagemin";
import jpegtran from "imagemin-jpegtran";
import minify_css from "gulp-minify-css";
import minify_html from "gulp-minify-html";
import notify from "gulp-notify";
import open from "gulp-open";
import packer from "webpack-stream";
import plumber from "gulp-plumber";
import sass from "gulp-ruby-sass";
import sourcemaps from "gulp-sourcemaps";
import svgmin from "gulp-svgmin";
import webpack from "webpack";
import gulpSync from "gulp-sync";

const DESTINATION = "dist";

gulp.task("default", gulpSync(gulp).sync([
  [
    "babel:development",
    "stylesheets",
    "background",
    "spritesheet",
    "fonts",
    "index",
  ],
  "serve", [
    "watch",
    "launch_browser"
  ]
]));

gulp.task("distribute", [
  "babel",
  "stylesheets",
  "background",
  "spritesheet",
  "fonts",
  "index",
  "serve"
]);

gulp.task("watch", () => {
  gulp.watch(get("**/*.js"), ["babel:development"]);
  gulp.watch(get("**/*.jsx"), ["babel:development"]);
  gulp.watch(get_asset("stylesheets/**/*.scss"), ["stylesheets"]);
});

gulp.task("babel", () => {
  return gulp.src(get("index.jsx"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      packer(
        packer_settings({
          minify: true
        })
      )
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

gulp.task("babel:development", () => {
  return gulp.src(get("index.jsx"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      packer(
        packer_settings({
          minify: false,
          sourcemap: true
        })
      )
    )
    .pipe(
      connect.reload()
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

///\\\///\\\ ASSET TASKS ///\\\///\\\

gulp.task("stylesheets", () => {
  return sass(
      get_asset("stylesheets/**/*.scss"), {
        sourcemap: true
      }
    )
    .pipe(
      plumber(handle_error)
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
      connect.reload()
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

gulp.task("spritesheet", () => {
  return gulp.src(get_asset("images/*.svg"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      svgmin()
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
      gulp.dest(DESTINATION)
    );
});

///\\\///\\\ INDEX AND SERVE ///\\\///\\\

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

gulp.task("launch_browser", () => {
  return gulp.src(__filename)
    .pipe(
      open({
        uri: "http://localhost:9999"
      })
    );
});

///\\\///\\\ HELPERS ///\\\///\\\

function packer_settings(options) {
  let plugins;

  if (options.minify) {
    plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
          semicolons: true,
        },
      }),
    ];
  }

  return {
    devtool: (options.sourcemap) ? "source-map" : null,
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        loader: "babel",
        exclude: /node_modules/
      }]
    },
    plugins,
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
