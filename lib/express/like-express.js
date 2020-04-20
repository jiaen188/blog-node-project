const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [] // app.post(...)
    }
  }

  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转换为数组， 存入 stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/' // 默认是根路由
      // 从第一个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }

    // 获取routes
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(routeInfo => {
      // url === '/api/get-cookie' 且 routeInfo.path === '/'
      // url === '/api/get-cookie' 且 routeInfo.path === '/api'
      // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
      // 判断当前的url符合在curRoutes.path 匹配的，即要执行的中间件
      if (url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  // 核心的 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleWare = stack.shift()
      // const middleWare = (req, res, next) => {
      //   console.log('请求开始', req.method, req.url)
      //   next()
      // }
      if (middleWare) {
        // 执行中间件函数
        middleWare(req, res, next)
      }
    }
    next()
  }

  calback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()

      // 获取这个url可执行的中间件列表
      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.calback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress
}