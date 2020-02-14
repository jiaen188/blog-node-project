const getList = (author, keyword) => {
  // 先返回假数据（格式正确）
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容A',
      author: 'zhangsan',
    },
    {
      id: 2,
      title: '标题2',
      content: '内容B',
      author: 'lisi',
    }
  ]
}

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题1',
    content: '内容A',
    author: 'zhangsan',
  }
}

module.exports = {
  getList,
  getDetail
}
