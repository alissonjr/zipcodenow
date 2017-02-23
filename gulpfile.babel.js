/**
  @description Arquivo gulp de automação de tarefas
  @author Alisson Costa de Oliveira Júnior - alisson.coj@hotmail.com
*/
// ///////////////////////////
// dependencies
import gulp from 'gulp'; // dependência raiz

import sass from 'gulp-sass'; // converte o .sass para .css

import nano from 'gulp-cssnano'; // minifica o css

import autoprefixer from 'gulp-autoprefixer'; // coloca prefixo nas propriedades como 'moz-', 'webkit-'

import sourcemaps from 'gulp-sourcemaps'; // cria o map das funções e classes

import plumber from 'gulp-plumber'; // mostra os erros

import htmlmin from 'gulp-htmlmin'; // minifica o html

import babel from 'gulp-babel'; // converte o js de ES6 para ES5


// ///////////////////////////
// gulp watch constructor task
gulp.task('watch-build', () => {
    gulp.watch('src/js/zipcodenow.js', ['js']);
    gulp.watch('src/sass/**/*.sass', ['css']);
    gulp.watch('src/html/*.html', ['html']);
});

// ///////////////////////////
// init default
gulp.task('default', ['css', 'js', 'html']);
gulp.task('watch', ['default', 'watch-build']);

// ///////////////////////////
// js task
gulp.task('js', () => {
  return gulp.src('src/js/zipcodenow.js')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      handleError: function (error) {
        console.log(error);
        this.emit('end');
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'));
});

// ///////////////////////////
// css task
gulp.task('css', () => {
    return gulp.src('src/sass/master.sass')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            handleError: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(nano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
});
// ///////////////////////////
// html task
gulp.task('html', () => {
  return gulp.src('src/html/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./'));
});
