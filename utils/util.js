module.exports = {
  // 响应客户端
  responseClient(res, httpCode = 200, code = 200, message = '成功', data = {}) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData);
  }
};
