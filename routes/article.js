import Article from '../models/article';
import { responseClient } from '../utils/util';
const { validationResult, check, oneOf } = require('express-validator/check');
module.exports = [
  {
    method: 'POST',
    path: '/addArticle',
    handler: (req, res) => {
      const { title, author, content, keyword, desc, tags, category, type, state, origin } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (!result.array().length) {
          res.json({ code: 400, message: 'title,author,content 为必填字段' });
        } else {
          res.json({ code: 400, message: result.array()[0].msg });
        }
      } else {
        let tempArticle = new Article({
          title,
          author,
          keyword: keyword ? keyword.split(',') : [],
          content,
          desc,
          tags: tags ? tags.split(',') : [],
          category: category ? category.split(',') : [],
          type,
          state,
          origin
        });
        tempArticle
          .save()
          .then(data => {
            res.json({ code: 200, message: `成功添加文章` });
          })
          .catch(err => {
            res.status(500).json({ code: 500, message: '系统异常' });
          });
      }
    },
    config: {
      validate: [check('title', 'title 为必填字段').exists(), check('author', 'author 为必填字段').exists(), check('content', 'content 为必填字段').exists()]
    }
  },
  {
    method: 'POST',
    path: '/delArticle',
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
        Article.deleteMany({ id: id })
          .then(result => {
            if (result.n === 1) {
              res.json({ code: 200, message: '成功删除该文章' });
            } else {
              res.json({ code: 200, message: '该文章不存在' });
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
  },
  {
    method: 'POST',
    path: '/updateArticle',
    handler: (req, res) => {
      const { title, author, content, keyword, desc, tags, category, type, state, origin, id } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.json({ code: 400, message: 'id 为必填字段' });
      } else {
        Article.update(
          { id: id },
          {
            title,
            author,
            keyword: keyword ? keyword.split(',') : [],
            content,
            desc,
            tags: tags ? tags.split(',') : [],
            category: category ? category.split(',') : [],
            type,
            state,
            origin
          }
        )
          .then(result => {
            res.json({ code: 200, message: '成功更新该文章' });
          })
          .catch(err => {
            console.log(err);
            res.json({ code: 500, message: '系统异常' });
          });
      }
    },
    config: {
      validate: [check('id', 'id 为必填字段').exists()]
    }
  },
  {
    method: 'GET',
    path: '/getArticleList',
    handler: (req, res) => {
      let pageNum = parseInt(req.query.pageNum) || 1;
      let pageSize = parseInt(req.query.pageSize) || 10;
      let conditions = {};
      let fields = {
        title: 1,
        desc: 1,
        tags: 1,
        author: '',
        content: '',
        category: 1,
        create_time: 1
      };
      let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
      let responseData = {
        count: 0,
        list: []
      };
      Article.countDocuments({}, (err, count) => {
        if (err) {
          console.log('Error:' + err);
        } else {
          responseData.count = count;
        }
        let options = {
          skip: skip,
          limit: pageSize,
          sort: { create_time: -1 }
        };
        Article.find(conditions, fields, options, (error, result) => {
          if (err) {
            console.error('Error:' + error);
          } else {
            responseData.list = result;
          }
          res.json({ code: 200, message: '成功获取数据', data: responseData });
        });
      });
    },
    config: {
      validate: []
    }
  }
];
