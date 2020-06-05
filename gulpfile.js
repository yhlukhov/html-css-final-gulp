const gulp = require('gulp')
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;

const paths = {
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css'
    },
    scripts: {
        src: 'app/scripts/**/*.js',
        dest: 'build/scripts'
    },
    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    },
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    },
    images960: {
        src: 'app/images/w960/*.*',
        dest: 'build/images/w960'
    },
    images768: {
        src: 'app/images/w768/*.*',
        dest: 'build/images/w768'
    }, 
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts'
    }
};

function browser(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
    done();
};

function browserReload(done) {
    browserSync.reload();
    done();
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(autoprefixer({ browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7'] }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}

function fonts() {
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream())
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream())
}

function images960() {
    return gulp.src(paths.images960.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images960.dest))
        .pipe(browserSync.stream())
}

function images768() {
    return gulp.src(paths.images768.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images768.dest))
        .pipe(browserSync.stream())
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.images960.src, images960);
    gulp.watch(paths.images768.src, images768);
    gulp.watch('./app/*.html', gulp.series(browserReload));
}

const build = gulp.parallel(styles, scripts, html, fonts, images, images960, images768);
gulp.task('build', build);
gulp.task('default', gulp.parallel(watch, browser, build));