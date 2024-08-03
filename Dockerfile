# 使用官方Node.js运行时作为父镜像
FROM node:18.20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 将package.json和package-lock.json拷贝到容器中
COPY package*.json ./
# 淘宝镜像
RUN npm config set registry=https://registry.npmmirror.com/
# 安装项目依赖
RUN npm ci

# 拷贝源码到容器中
COPY . .

# 使用Vite构建应用
RUN npm run build

# 生产环境镜像
FROM node:18.20-alpine AS production

WORKDIR /app

# 只拷贝生产所需的文件
COPY --from=builder /app/dist /app/dist

# 启动应用
CMD ["npx", "serve", "-s", "dist", "-p", "8080"]

# 暴露端口
EXPOSE 8080