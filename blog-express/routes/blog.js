var express = require('express');
var router = express.Router();
const { 
  getList,
  getDetail,
  newBlog,
  upateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', function(req, res, next) {
  let { author = '', keyword = '' } = req.query

  if (req.query.isadmin) {
    // 管理员界面
    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //   // 未登录
    //   return loginCheckResult
    // }
    // 强制查询自己的博客
    author = req.session.username
  }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get('/detail', function(req, res, next) {
  res.json({
    errno: 0,
    data: 'ok'
  })
});

module.exports = router;
