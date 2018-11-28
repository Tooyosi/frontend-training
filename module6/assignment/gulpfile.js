const gulp          = require("gulp"),
      sass          = require("gulp-sass"),
      cssnano       = require("gulp-cssnano"),
      autoprefixer  = require("gulp-autoprefixer"),
      concat        = require("gulp-concat"),
      uglify        = require("gulp-uglify"),
      axios         = require("axios"),
      browserSync   = require("browser-sync").create();

const paths = {
    source: {
        scripts: [
            "src/js/main.js",
        ],
        styles: [
            "src/**/*.scss"
        ],
    },
    target:{
        script: "dist/js",
        styles: "dist/css"
    }
}

gulp.task("css", ()=>{
    gulp.src(paths.source.styles)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', '>1%'] }))
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(paths.target.styles))
});

gulp.task('js', ()=> {
    gulp.src(paths.source.scripts)
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(paths.target.script))
        .pipe(browserSync.stream())
});

gulp.task('serve', () => {
    browserSync.init({ server: { baseDir: './' } });
    gulp.watch(paths.target.styles, ['css']);
    gulp.watch(paths.target.script, ['js']);
    gulp.watch('*html').on('change', browserSync.reload)
});

gulp.task('build', ['css', 'js'])

gulp.task('default', ['serve'])