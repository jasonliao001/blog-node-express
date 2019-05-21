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
- 待添加

## 已实现

- 使用 express-validator 入参校验

- 多环境配置

## 待实现

- 用户登陆与注册

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
