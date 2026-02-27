# 图片代理

一个轻量级的代理服务器，用于从受控的一组远程域获取图片。
通过限制允许的主机，此项目有助于防止代理资源被滥用，同时仍然
可以可靠地从受信任的 CDN 检索资产。

## 主要功能

- **域名白名单** – 只有主机与配置中的条目匹配的 URL 才被允许。
- **简单设置** – 依赖最少，仅有一个 `index.js` 入口点。
- **可扩展** – 可以扩展允许的域名列表，或从环境变量加载。

## 入门指南

1. 克隆仓库：

   ```bash
   git clone https://your.git.server/your/repo.git
   cd image-proxy
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 启动代理：

   ```bash
   npm start
   ```

4. 将请求指向 `http://localhost:PORT/?url=...`，其中 `PORT` 是在
   `ecosystem.config.js` 或 `PORT` 环境变量中配置的端口值。

## 代码概览

- `utils/domain.js` – 包含 `ALLOW_DOMAINS` 列表和用于验证请求 URL 的
  `isAllowedDomain()` 辅助函数。
- `proxy.js` – 核心代理逻辑：解析传入请求、验证域名并转发批准的图片抓取。
- `index.js` – 应用入口点，用于启动服务器。

## 配置

编辑 `utils/domain.js` 中的 `ALLOW_DOMAINS` 数组以添加或删除受信任的主机。
在生产环境中，可以用配置文件或环境变量替换硬编码列表。

## 贡献指南

1. Fork 该仓库。
2. 创建功能分支（`git checkout -b feature/foo`）。
3. 提交更改（`git commit -am 'Add some foo'`）。
4. 推送到该分支（`git push origin feature/foo`）。
5. 创建一个 Pull Request。

## 许可证

[在此指定许可证]
