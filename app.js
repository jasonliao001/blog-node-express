var express = require('express');
var app = express();
var expressJWT = require('express-jwt');
require('babel-register');

// JWT
app.use(
  expressJWT({
    secret: process.env.JWT_SECRET
  }).unless({
    path: ['/getToken', '/login', '/register'] //除了这个地址，其他的URL都需要验证
  })
);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    if (err.code == 'credentials_required') {
      res.json({ code: 401, message: 'header中需有authorization字段' });
    } else if (err.inner.name == 'TokenExpiredError') {
      res.json({ code: 401, message: 'token过期,请重新登陆' });
    } else if (err.inner.name == 'JsonWebTokenError') {
      res.json({ code: 401, message: 'token无效,拒绝访问' });
    }
  }
  next();
});
// body-parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// params validator
// validator.register(app);
// data server
const mongodb = require('./models/index');
mongodb.connect();
// register router
const route = require('./routes/index');
route(app);
module.exports = app;
