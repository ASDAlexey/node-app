const gulp = require('gulp');
const wiredep = require('wiredep').stream;
const inject = require('gulp-inject');
const bowerJson = require('./bower.json');
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('inject', () => {
    const injectSrc = gulp.src([
        './public/css/*.css',
        './public/js/*.js',
    ], { read: false });
    const injectOptions = {
        ignorePath: '/public',
    };
    const options = {
        bowerJson,
        directory: './public/lib',
        ignorePath: '../../public',
    };
    return gulp
        .src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});
gulp.task('serve', ['inject'], () => {
    const options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            port: 3000,
        },
        watch: jsFiles,
    };
    return nodemon(options)
        .on('restart', () => console.log('Restarting...'));
});
