---
title: 'Docker 实战：从零搭建开发环境'
description: 'Docker 是现代开发必备的工具。本文通过实际案例，教你如何使用 Docker 搭建一致的开发环境，解决"在我机器上能跑"的问题。'
pubDate: 2024-02-05
tags: ['Docker', 'DevOps', '后端开发']
---

## 为什么需要 Docker？

你是否遇到过这种情况：

- 在你机器上运行正常，在同事机器上就报错
- 新人入职需要花一天时间配置开发环境
- 不同项目需要不同版本的 Node.js、Python 等运行时

Docker 可以完美解决这些问题。

## Docker 基础概念

### 镜像（Image）

镜像是一个只读的模板，包含了运行应用所需的一切：

```dockerfile
# Node.js 应用的 Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

### 容器（Container）

容器是镜像运行时的实例：

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -p 3000:3000 myapp:1.0
```

### Docker Compose

Docker Compose 用于定义和运行多容器应用：

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 实战案例：全栈应用 Docker 化

### 项目结构

```
myapp/
├── frontend/          # React 前端
├── backend/           # Node.js 后端
├── docker-compose.yml
└── .env
```

### 前端 Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 后端 Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 4000

CMD ["node", "src/index.js"]
```

### Docker Compose 配置

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## 开发环境最佳实践

### 1. 使用开发容器

为开发环境创建单独的配置：

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      target: development
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

### 2. 热重载

挂载源代码目录实现热重载：

```yaml
volumes:
  - ./src:/app/src
  - /app/node_modules  # 防止覆盖 node_modules
```

### 3. 环境变量管理

使用 `.env` 文件管理环境变量：

```bash
# .env
DB_PASSWORD=secure_password
JWT_SECRET=your_secret_key
API_KEY=your_api_key
```

```yaml
# docker-compose.yml
services:
  app:
    env_file:
      - .env
```

## 生产环境优化

### 1. 多阶段构建

```dockerfile
# 构建阶段
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### 2. 镜像优化

- 使用 `alpine` 基础镜像
- 合并 RUN 指令减少层数
- 清理不必要的文件
- 使用 `.dockerignore`

```dockerignore
# .dockerignore
node_modules
npm-debug.log
.git
.env
```

### 3. 安全扫描

```bash
# 使用 Trivy 扫描镜像漏洞
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:1.0
```

## 常用命令速查

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -d -p 8080:80 --name myapp myapp:1.0

# 查看日志
docker logs -f myapp

# 进入容器
docker exec -it myapp sh

# 停止并删除容器
docker stop myapp && docker rm myapp

# 删除镜像
docker rmi myapp:1.0

# Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down
docker-compose exec backend sh
```

## 总结

Docker 是现代开发的必备技能，它带来的好处包括：

1. **环境一致性**：所有人使用相同的开发环境
2. **快速上手**：新成员只需运行 `docker-compose up`
3. **隔离性**：不同项目互不影响
4. **简化部署**：开发、测试、生产环境完全一致

如果你还没有使用 Docker，现在就开始吧！从简单的单容器应用开始，逐步掌握多容器编排，你会发现开发效率大幅提升。

推荐资源：
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [最佳实践](https://docs.docker.com/develop/dev-best-practices/)
