const gulp = require("gulp");
const concatCss = require("gulp-concat-css");
const cssNano = require("gulp-cssnano");
const minify = require("gulp-minify");
const sass = require("gulp-sass")(require("sass"));
const cssprefix = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function sassFunc() {
    return gulp
        .src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            cssprefix("last 2 versions").on("error", (err) => {
                console.log(
                    `Error: ${err.message} on line: ${err.lineNumber} in: ${err.fileName}`
                );
            })
        )
        .pipe(concatCss("style.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("compress", function compressFunc() {
    return gulp
        .src("./dist/css/style.css")
        .pipe(cssNano())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("compressJs", function (done) {
    gulp.src(["./src/js/**/*.js"])
        .pipe(minify())
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());

    done();
});

gulp.task("copyFonts", function (done) {
    gulp.src(["./src/**/fonts/**/*.{ttf,woff,woff2}"]).pipe(
        gulp.dest("./dist")
    );
    done();
});

gulp.task("copyImages", function (done) {
    gulp.src(["./src/**/img/**/*.{png,jpg,jpeg,gif,svg,ico}"]).pipe(
        gulp.dest("./dist")
    );
    done();
});

gulp.task(
    "serve",
    gulp.series(
        "sass",
        "compress",
        "compressJs",
        "copyFonts",
        "copyImages",
        function (done) {
            browserSync.init({
                server: "./",
            });

            gulp.watch(
                ["./src/scss/**/*.scss"],
                gulp.series("sass", "compress")
            );
            gulp.watch("./src/js/**/*.js", gulp.series("compressJs"));
            gulp.watch("./*.html").on("change", browserSync.reload);
            done();
        }
    )
);

gulp.task("default", gulp.series("serve"));
