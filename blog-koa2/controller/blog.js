const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 返回 promise
  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = Date.now()

  // blogData 是一个博客对象， 包含 title content 属性
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${xss(title)}', '${xss(content)}', '${createtime}', '${author}');
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const upateBlog = async (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象， 包含 title content 属性
  const { title, content } = blogData
  const sql = `
    update blogs set title='${xss(title)}', content='${xss(content)}' where id=${id}
  `
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  // id 就是要删除博客的 id
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  upateBlog,
  delBlog
}
