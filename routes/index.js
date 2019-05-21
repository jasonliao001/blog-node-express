/*
 *所有的路由接口
 */
const article = require('./article');
const tag = require('./tag');
const category = require('./category');
module.exports = app => {
  const routers = [...tag, ...category, ...article];
  routers.forEach(item => {
    if (item.method === 'POST') {
      app.post(`${item.path}`, item.config.validate || null, item.handler);
    }
    if (item.method === 'GET') {
      app.get(`${item.path}`, item.config.validate || null, item.handler);
    }
  });
};
