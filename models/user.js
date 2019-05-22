/**
 * User model module.
 * @file 权限和用户数据模型
 * @module model/user
 *
 */

const crypto = require('crypto');

const { mongoose } = require('./index.js');
const autoIncrement = require('mongoose-auto-increment');

const adminSchema = new mongoose.Schema({
  // 用户名
  username: { type: String, required: true, default: '' },

  // 手机
  phone: { type: String, default: '' },

  // 邮箱
  email: {
    type: String,
    default: ''
  },

  // 用户角色
  role: {
    type: Number,
    default: 1
  },

  // 个人介绍
  introduce: { type: String, default: '' },

  // 密码
  password: {
    type: String,
    required: true,
    default: ''
  },

  // 创建日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now }
});

// 自增 ID 插件配置
adminSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('User', adminSchema);
