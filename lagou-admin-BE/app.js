var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionAddRouter = require('./routes/position.add.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

//处理post请求的数据  req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//存储cookie
app.use(cookieParser());

//静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

//使用路由中间件
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/api/position', positionAddRouter) //   /api/position/add  api/position/find

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// 错误中间件
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;