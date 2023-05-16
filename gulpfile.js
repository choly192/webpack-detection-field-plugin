
const gulp = require("gulp");
const ts = require("gulp-typescript");
const clean = require("gulp-clean");
const tsProject = ts.createProject('tsconfig.json');
const uglify = require("gulp-uglify");

function build() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(gulp.dest('dist'));
}

function cleanDist() {
  return gulp.src("dist").pipe(clean())
}

// gulp.task("build", function () {
//   return tsProject.src()
//     .pipe(tsProject())
//     .js.pipe(uglify())
//     .pipe(gulp.dest('dist'));
// });
exports.build = build;
exports.clean = cleanDist;
exports.default = gulp.series(cleanDist, build)