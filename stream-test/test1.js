// 标准输入输出
process.stdin.pipe(process.stdout)

const http = require('http')
const server = http.createServer((res, res) => {
  if (req.method === 'POST') {
    req.pipe(res) // 最主要
  }
})
server.listen(8080)
