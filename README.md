### 目录结构

> 基于 node+express+mongodb 的博客后端

```
├── bin
  ├── www           # 脚本执行
├── config          # 项目配置目录
| ├── index.js      # 项目中配置信息
  ├── const.js      # 常量
├── models          # 数据库 model
  ├── index.js      #
├── node_modules    # 依赖目录
├── utils           # 工具函数目录
├── routes          # 路由目录
│ ├── index.js      #
├── views           # 模版文件
├── app.js          # 项目入口文件
├── pm2.json        # pm2配置json
├── package.json    # JS 项目工程依赖库
├── readme.md       # readme.md
```

## 技术

- node
- express
- mongodb
- mongoose
- mongoose-auto-increment
- pm2
- express-jwt
- jsonwebtoken

## 已实现

- 使用 express-validator 入参校验

- 多环境配置

- 用户登陆与注册

- jwt 身份验证

## 待实现

- 文件上传

- 数据加密

- 测试

- 自动化部署

## Build Setup

```
# install dependencies
npm install

# dev environment
npm run pm2:dev
# pro environment
npm run pm2:pro
# test environment
npm run pm2:test
```

## FAQ

#### jwt 登陆逻辑

1. 用户使用用户名密码、或第三方授权登录后，请求应用服务器；
2. 服务器验证用户信息是否合法；
3. 对通过验证的用户，签发一个包涵用户 ID、其他少量用户信息（比如用户角色）以及失效时间的 JWT token；
4. 客户端存储 JWT token，并在调用需要身份验证的接口服务时，带上这个 JWT token 值；
5. 服务器验证 JWT token 的签发合法性，时效性，验证通过后，返回业务数据。
