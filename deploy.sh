#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 构建
npm run build

# 进入构建输出目录
cd dist

# 创建 .nojekyll 防止 GitHub Pages 忽略下划线开头的文件
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Willwillam/xiaoxiong.git main:gh-pages

cd - 