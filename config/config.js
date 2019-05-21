/**
 * App config module.
 * @file 应用运行配置
 * @module app.config
 *
 */

const path = require('path');
const { argv } = require('yargs');

exports.APP = {
  LIMIT: 10,
  PORT: process.env.APP_PORT || 3000,
  ROOT_PATH: __dirname,
  NAME: 'biaochenxuying',
  URL: 'http://biaochenxuying.cn/main.html',
  FRONT_END_PATH: path.join(__dirname, '..', 'biaochenxuying')
};

exports.MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || process.env.DB_PORT || '27017'}/${process.env.DB_NAME}`,
  username: argv.db_username || process.env.DB_USER || 'DB_password',
  password: argv.db_password || process.env.DB_PASS || 'DB_password'
};
