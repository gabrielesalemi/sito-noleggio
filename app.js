var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser')

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var addettoRouter = require('./routes/addetto');
var autistaRouter = require('./routes/autista');


var app = express();
var cors = require('cors')
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ credentials: true }));

app.use('/', userRouter);
app.use('/autista', autistaRouter);
app.use('/addetto', addettoRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");

  //Set static folder
  app.use(express.static(path.join(__dirname, "/../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
  });
}





app.listen(9000, () => console.log('app is running'));


module.exports = app;
