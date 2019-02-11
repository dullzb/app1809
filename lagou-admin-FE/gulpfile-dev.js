/**
  gulp完成的任务：
  1、启动webserver
  2、编译sass, less
  3、CommonJS模块化
  4、Mock数据
  5、在Gulp里应用babel
*/

const gulp = require('gulp')

const server = require('gulp-webserver')

const sass = require('gulp-sass')

const webpack = require('webpack-stream')

const proxy = require('http-proxy-middleware')

const babel = require('gulp-babel')

const watch = require('gulp-watch')

gulp.task('server', () => {
  return gulp.src('./dev')
    .pipe(server({
      host: 'localhost',
      port: 8000,
      livereload: true,
      open:true,
      // directoryListing: {
      //   enable: true,
      //   path: './dev'
      // },
      //跨域代理服务
      middleware: [
        proxy('/api', {
          target: 'http://localhost:3000',//目标源   后端你要访问的 协议+域名
          changeOrigin: true //是将我们前端的服务  变成一个后端 
        }),
        proxy('/lagou', {
          target: 'https://m.lagou.com',
          changeOrigin: true,
          pathRewrite: {   //路径重写             localhost:3000/lagou/api/position/add
            '^/lagou': ''
          }
        }),
        proxy('/backend', {
          target: 'http://localhost:3000',
          changeOrigin: true
        })
      ]
    }))
})

gulp.task('scss', () => {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev/styles'))
})

gulp.task('js', () => {
  return gulp.src('./src/scripts/*.js')
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
      }
    }))
    /* .pipe(babel({
      presets: ['env', 'stage-0']
    })) */
    .pipe(gulp.dest('./dev/scripts'))
})

gulp.task('copyhtml', () => {
  return gulp.src(['./*.html'])
    .pipe(gulp.dest('./dev/'))
})

gulp.task('copylibs', () => {
  return gulp.src(['./src/libs/**/*'])
    .pipe(gulp.dest('./dev/libs'))
})

gulp.task('copystatic', () => {
  return gulp.src(['./src/static/**/*'])
    .pipe(gulp.dest('./dev/static'))
})

gulp.task('watch', () => {
  // gulp.watch('./*.html', ['copyhtml'])
  // gulp.watch('./src/styles/**/*', ['scss'])
  // gulp.watch('./src/scripts/**/*', ['js'])

  watch('./*.html', () => {
    gulp.start('copyhtml')
  })
  watch('./src/styles/**/*', () => {
    gulp.start('scss')
  })
  watch('./src/scripts/**/*', () => {
    gulp.start('js')
  })
})

gulp.task('default', ['js', 'scss', 'copyhtml', 'copylibs', 'copystatic' ,'server', 'watch'], () => {
  console.log('done.');
})
