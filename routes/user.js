import User from '../models/user';
const JWT = require('jsonwebtoken');
const { validationResult, check, oneOf } = require('express-validator/check');
module.exports = [
  // 注册用户
  {
    method: 'POST',
    path: '/register',
    handler: (req, res) => {
      let { username, password, phone, email, introduce } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (!result.array().length) {
          res.json({ code: 400, message: 'username, password, phone, email 为必填字段' });
        } else {
          res.json({ code: 400, message: result.array()[0].msg });
        }
      } else {
        User.findOne({ email: email })
          .then(data => {
            if (data) {
              res.json({ code: 400, message: '用户邮箱已存在！' });
            }
            let user = new User({
              email,
              username,
              password,
              phone,
              introduce
            });
            user.save().then(data => {
              res.json({ code: 200, message: '注册成功' });
            });
          })
          .catch(err => {
            res.json({ code: 500, message: '系统异常' });
          });
      }
    },
    config: {
      validate: [
        check('username', 'username 为必填字段').exists(),
        check('password', 'password 为必填字段').exists(),
        check('phone', 'phone 为必填字段').exists(),
        check('email')
          .exists()
          .withMessage('emial 为必填字段')
          .matches(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)
          .withMessage('请输入格式正确的邮箱！')
      ]
    }
  },
  {
    method: 'POST',
    path: '/delUser',
    handler: (req, res) => {
      let { id } = req.body;
      User.deleteMany({ id: id })
        .then(result => {
          if (result.n === 1) {
            res.json({ code: 200, message: '成功删除用户' });
          } else {
            res.json({ code: 200, message: '该用户不存在' });
          }
        })
        .catch(err => {
          res.json({ code: 500, message: '系统异常' });
        });
    },
    config: {
      validate: []
    }
  },
  // 获取用户信息
  {
    method: 'GET',
    path: '/getUserInfo',
    handler: (req, res) => {
      let { userId } = req.user;
      console.log('req========- :', req.user);
      // 查询数据库中存在的userId，返回client后不调用维持登陆态
      User.findOne({
        _id: userId
      }).then(result => {
        if (result) {
          // 此处再更新exp,client 前端再刷新的，重新签发token
          res.json({
            code: 200,
            message: '获取该信息成功',
            data: result
          });
        } else {
          res.json({
            code: 400,
            message: '该用户不存在，请重新登陆'
          });
        }
      });
    },
    config: {
      validate: []
    }
  },
  // 登陆
  {
    method: 'POST',
    path: '/login',
    handler: (req, res) => {
      let { email, password } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (!result.array().length) {
          res.json({ code: 400, message: 'email, password 为必填字段' });
        } else {
          res.json({ code: 400, message: result.array()[0].msg });
        }
      } else {
        User.findOne({
          email,
          password
        })
          .then(userInfo => {
            if (userInfo) {
              const generateJWT = jwtInfo => {
                const payload = {
                  userId: jwtInfo._id,
                  exp: Math.floor(Date.now() / 1000) + 60 * 4 // 签发一条 1 小时后失效的 JWT
                };
                return JWT.sign(payload, process.env.JWT_SECRET);
              };
              const token = generateJWT(userInfo);

              res.json({ code: 200, message: '登陆成功', token: token });
            } else {
              res.json({ code: 400, message: '用户名或者密码错误' });
            }
          })
          .catch(err => {
            res.json({ code: 500, message: '系统异常' });
          });
      }
    },
    config: {
      validate: [
        check('email')
          .exists()
          .withMessage('email 为必填字段')
          .matches(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)
          .withMessage('请输入格式正确的邮箱！'),
        check('password', 'password 为必填字段').exists()
      ]
    }
  },
  {
    method: 'GET',
    path: '/getToken',
    handler: (req, res) => {
      const generateJWT = jwtInfo => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 // 签发一条 1 小时后失效的 JWT
        };
        return JWT.sign(payload, process.env.JWT_SECRET);
      };
      const token = generateJWT({ userId: 1 });
      res.json({ code: 200, message: 'JWT签发成功', token: token });
    },
    config: {
      validate: []
    }
  }
];
