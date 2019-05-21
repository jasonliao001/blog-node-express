/**
 * Tag model module.
 * @file 标签数据模型
 * @module model/tag
 *
 */

const { mongoose } = require('./index');
const autoIncrement = require('mongoose-auto-increment');

// 标签模型
const tagSchema = new mongoose.Schema({
  // 标签名称
  name: { type: String, required: [true, 'name 是必须的'], validate: /\S+/ },

  // 标签描述
  desc: String,

  // 发布日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now }
});
// 静态方法（Statics）
tagSchema.statics.DeleteById = function(id) {
  return this.deleteMany({ id: id });
};
//添加查询辅助功能（待补充）
//...
//虚拟属性(待补充)

// 自增ID插件配置
tagSchema.plugin(autoIncrement.plugin, {
  model: 'Tag',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

// 标签模型
module.exports = mongoose.model('Tag', tagSchema);
