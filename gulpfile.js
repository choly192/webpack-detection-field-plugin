const gulp = require("gulp");
const ts = require("gulp-typescript");
const clean = require("gulp-clean");
const tsProject = ts.createProject('tsconfig.json');
const uglify = require("gulp-uglify");
const gulpJsonEditor = require('gulp-json-editor');

function build() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(gulp.dest('dist'));
}

function cleanDist() {
  return gulp.src("dist", { read: false, allowEmpty: true }).pipe(clean())
}

function copyLicense() {
  return gulp.src(["./LICENSE"])
    .pipe(gulp.dest('dist'))
}

// 复制package.json 并删除指定字段
const removeFields = ["scripts", "devDependencies", "dependencies"]
function copyPackageJson() {
  return gulp.src("./package.json")
    .pipe(gulpJsonEditor(function (json) {
      // 删除指定的字段
      removeFields.forEach(field => {
        delete json[field]
      });
      return json;
    })).pipe(gulp.dest('dist'))
}

// gulp.task("build", function () {
//   return tsProject.src()
//     .pipe(tsProject())
//     .js.pipe(uglify())
//     .pipe(gulp.dest('dist'));
// });
exports.build = build;
exports.clean = cleanDist;
exports.default = gulp.series(cleanDist, gulp.parallel(copyLicense, copyPackageJson), build)