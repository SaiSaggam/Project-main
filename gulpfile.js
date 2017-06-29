var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var nano = require('gulp-cssnano');
var cssmin = require('gulp-cssmin');
var config = require('./gulp.config.js');


var source = {
    js: {
        src: [
            'public/app/controllers/**.js',
            'public/app/directives/**.js',
            'public/app/partials/**.js',
            'public/app/services/**.js',
            'public/app/constants/**.js'
        ]
    },
    css: {
        src: [
            'public/app/styles/**.css'
        ]
    }
}

// app js
gulp.task('app-js', function() {
    gulp.src(config.APP_JS)
        .pipe(concat('app.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/assets/js'));
});

// vendor js
gulp.task('vendor-js', function() {
    gulp.src(config.VENDOR_JS)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/js'));
});

//app-css
gulp.task('app-css', function() {
    return gulp.src(config.APP_CSS)
        .pipe(concat('app.min.css'))
        // .pipe(nano())
        .pipe(gulp.dest('./public/assets/css'));
});


// watch
gulp.task('watch', function() {
    gulp.watch(source.js.src, ['app-js']);
    gulp.watch(source.css.src, ['app-css']);
});

gulp.task('build', ['vendor-js', 'app-js', 'app-css', 'watch']);


gulp.task('default', ['build']);


// gulp.task('build', ['vendor-js', 'vendor-css']);

// GULP MINFY
// gulp.task('scripts', function() {
//     gulp.src('./scripts/**/*.js')
//         .pipe(minify({
//             ext: {
//                 min: '.js'
//             },
//         }))
//         .pipe(gulp.dest('./assets/js'));
// });

// GULP UGLIFY
// gulp.task('scripts', function() {
//     gulp.src('./scripts/**/*.js')
//         .pipe(concat('app.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./assets/js'));
// });

// GULP CSS
// app css
// gulp.task('app-css', function() {
//     return gulp.src('app-css/*.css')
//         .pipe(concat('app.min.css'))
//         .pipe(nano())
//         .pipe(gulp.dest('./assets/css'));
//
// });
