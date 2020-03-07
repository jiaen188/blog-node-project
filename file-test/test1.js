const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   // data 是二进制类型，需要转换为字符串
//   console.log(data.toString())
// })

// 写文件
// const content = '这是新写入的内容'
// const opt = {
//   flag: 'a' // 追加写入。覆盖用 'w'
// }

// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//     return
//   }
// })

// 判断文件是否存在
// fs.exists(fileName, (exist) => {
//   console.log('exist', exist)
// })
