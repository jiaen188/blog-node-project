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

const newBlog = (blogData = {}) => {
  console.log('newBloag blogData...', blogData)
  // blogData 是一个博客对象， 包含 title content 属性
  return {
    id: 3 // 表示新建博客，插入到数据表的 id
  }
}

const upateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象， 包含 title content 属性
  console.log('update blog', id, blogData)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  upateBlog
}
