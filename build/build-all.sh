#!/bin/bash

## 一键打包所有 package

# 获取 yarn dev/build 类型
buildType=build
if [ -n "$1" ]; then  
  buildType=$1
fi

cd ./packages/utils

# core 要第一个打包
cd ./copy-text
rm -rf dist # 清空 dist 目录
yarn "$buildType"
