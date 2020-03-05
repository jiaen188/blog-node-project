# 如何本地联调前后端

# 全局安装npm install http-server -g
# 安装nginx
# 配置nginx
```
listen       8080;
...
location / {
    proxy_pass http://localhost:8001;
}

location /api/ {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host;
}
```
# 进入html-server启动 http-server -p 8001
# 进入根文件夹启动 npm run dev
# 打开浏览器 http://localhost:8080
