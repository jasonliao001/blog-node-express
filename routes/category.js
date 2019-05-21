import Category from '../models/category';
const { validationResult, check, oneOf } = require('express-validator/check');
module.exports = [
  {
    method: 'POST',
    path: '/addCategory',
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
        Category.findOne({
          name
        })
          .then(result => {
            if (!result) {
              let category = new Category({
                name,
                desc
              });
              category
                .save()
                .then(data => {
                  res.json({ code: 200, message: `成功添加'${name}'类别` });
                })
                .catch(err => {
                  console.log('2222222');
                  res.status(500).json({ code: 500, message: '系统异常' });
                });
            } else {
              res.json({ code: 400, message: '该类别已存在' });
            }
          })
          .catch(err => {
            console.log('111111', err);
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
    path: '/delCategory',
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
        Category.deleteMany({ id: id })
          .then(result => {
            if (result.n === 1) {
              res.json({ code: 200, message: '成功删除该类别' });
            } else {
              res.json({ code: 200, message: '该类别不存在' });
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
