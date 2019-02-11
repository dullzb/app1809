/**
  gulp完成的任务：
  1、编译sass, less
  2、CommonJS模块化
  3、版本号控制
  4、在Gulp里应用babel
  5、打包压缩
*/

const gulp = require('gulp')

const sass = require('gulp-sass')

const webpack = require('webpack-stream')

const proxy = require('http-proxy-middleware')

const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

const sequence = require('gulp-sequence')

const del = require('del')

const uglify = require('gulp-uglify')
const minifyCSS = require('gulp-minify-css')
const minifyHTML = require('gulp-minify-html')

var uglifyes = require('uglify-es')
var composer = require('gulp-uglify/composer');
var pump = require('pump');

const babel = require('gulp-babel')

// const HtmlWebpackPlugin = require('html-webpack-plugin')

gulp.task('scss', () => {
  return gulp.src('./src/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rev())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/rev/styles'))
})

gulp.task('js', () => {
  return gulp.src('./src/scripts/app.js')
    .pipe(webpack({
      entry: {
        app: './src/scripts/app.js'
      },
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [
          { test: /\.html$/, loader: 'string-loader' },
        ],
      },
      // plugins: [
      //   new HtmlWebpackPlugin({
      //     filename: 'index.html',
      //     template: './index.html'
      //   })
      // ]
    }))
    .pipe(rev())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/rev/scripts'))
})

const minify = composer(uglifyes, console);
gulp.task('compress', function (cb) {
  const options = {};

  pump([
      gulp.src('./dist/scripts/*.js'),
      minify(options),
      gulp.dest('./dist/scripts/')
    ],
    cb
  );
});

gulp.task('copyhtml', () => {
  return gulp.src(['./*.html', './dist/rev/**/*.json'])
    // .pipe(revCollector({
    //   replaceReved: true
    // }))
    // .pipe(minifyHTML())
    .pipe(gulp.dest('./dist'))
})

gulp.task('copypubindex', () => {
  gulp.src(['./dist/*.html'])
    .pipe(gulp.dest('./lagou-backend/public'))
})

gulp.task('copypubrev', () => {
  gulp.src(['./dist/rev/**/*'])
    .pipe(gulp.dest('./lagou-backend/public/rev'))
})

gulp.task('copylibs', () => {
  return gulp.src(['./src/libs/*.js'])
    .pipe(gulp.dest('./dist/libs'))
})

gulp.task('copyicon', () => {
  return gulp.src(['./src/iconfonts/**/*'])
    .pipe(gulp.dest('./dist/iconfonts'))
})

gulp.task('copyimages', () => {
  return gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('clear', del.bind(null, ['./dist/**/*'], {
  force: true
}))

gulp.task('default', (cb) => {
  sequence('clear', ['js', 'scss'], ['copyhtml', 'copylibs', 'copyicon', 'copyimages'], 'compress', 'copypubindex', 'copypubrev')(cb)
  console.log('build done.');
})
