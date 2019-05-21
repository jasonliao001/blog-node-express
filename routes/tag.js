import { responseClient } from '../utils/util';
import Tag from '../models/tag';
const { validationResult, check, oneOf } = require('express-validator/check');
module.exports = [
  {
    method: 'POST',
    path: '/addTag',
    handler: (req, res) => {
      const { name, desc } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (!result.array().length) {
          res.json({ code: 400, message: 'name 为必填字段' });
        } else {
          res.json({ code: 400, message: result.array()[0].msg });
        }
      } else {
        Tag.findOne({
          name
        })
          .then(result => {
            if (!result) {
              let tag = new Tag({
                name,
                desc
              });
              tag
                .save()
                .then(data => {
                  res.json({ code: 200, message: `成功添加'${name}'标签` });
                })
                .catch(err => {
                  res.status(500).json({ code: 500, message: '系统异常' });
                });
            } else {
              res.json({ code: 400, message: '该标签已存在' });
            }
          })
          .catch(err => {
            res.status(500).json({ code: 500, message: '系统异常' });
          });
      }
    },
    config: {
      validate: [check('name', 'name 为必填字段').exists()]
    }
  },
  {
    method: 'POST',
    path: '/delTag',
    handler: (req, res) => {
      let { id } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (!result.array().length) {
          res.json({ code: 400, message: 'id 为必填字段' });
        } else {
          res.json({ code: 400, message: result.array()[0].msg });
        }
      } else {
        Tag.DeleteById(id)
          .then(result => {
            if (result.n === 1) {
              res.json({ code: 200, message: '成功删除该标签' });
            } else {
              res.json({ code: 200, message: '该标签不存在' });
            }
          })
          .catch(err => {
            res.json({ code: 500, message: '系统异常' });
          });
      }
    },
    config: {
      validate: [check('id', 'id 为必填字段').exists()]
    }
  }
];
