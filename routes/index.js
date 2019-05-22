/*
 *所有的路由接口
 */
const article = require('./article');
const tag = require('./tag');
const category = require('./category');
const { createToken } = require('../plugins/generateJWT');
// const JWT = require('jsonwebtoken');
const user = require('./user');
module.exports = app => {
  const routers = [...tag, ...category, ...article, ...user];
  routers.forEach(item => {
    if (item.method === 'POST') {
      app.post(
        `${item.path}`,
        (req, res, next) => {
          if (req.user && req.user.exp - Math.floor(Date.now() / 1000) < 60 * 3) {
            const token = createToken(req.user);
            res.set('Authorization', token);
            // res.set('Access-Control-Expose-Headers', 'Authorization');
            // res.set('Cache-Control', 'no-store');
          }
          next();
        },
        item.config.validate || null,
        item.handler
      );
    }
    if (item.method === 'GET') {
      app.get(
        `${item.path}`,
        (req, res, next) => {
          //在距过期时间少于2分钟的时候，更新token
          if (req.user && req.user.exp - Math.floor(Date.now() / 1000) < 60 * 3) {
            const token = createToken(req.user);
            res.set('Authorization', token);
            // res.set('Access-Control-Expose-Headers', 'Authorization');
            // res.set('Cache-Control', 'no-store');
          }
          next();
        },
        item.config.validate || null,
        item.handler
      );
    }
  });
};
