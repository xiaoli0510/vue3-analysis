# 2vite 目录和详解

## vite 目录

public 下面的不会被编译，存放静态资源
assets 存放可编译的静态资源
components 组件
App.vue 全局组件
main.js main.ts 全局 js\ts 文件
index.html 入口文件

## SFC 语法规范

<template>
    * 只能有一个顶层 template
    * content 传给@vue/compiler-dom,预编译为 javascript 的渲染函数，并添加到导出的组件上作为其 render 选项
<script>
    * .vue可以有多个script(不包括<script setup> )
    * 脚本作为ES Module来执行
    * 默认导出的应该是Vue组件选项对象，是一个普通对象或者是defineComponent的返回值
<script setup>
    * .vue只能有一个<script setup>
    * 被预处理并作为组件的setup()函数使用，会在每个组件实例中执行，顶层绑定会自动暴露给模板
<style>
    * .vue可以有多个<style>
    * 通过scoped将样式封装在当前组件内

### npm run xx 详解

    - npm run dev 去 package.json 的 scripts 执行 dev 命令
    - npm install会在node_modules/.bin/创建好可执行文件，文件表示这是一个个软链接(是脚本)。先去node_modules/.bin/找对应的映射文件，再找到对应的js文件来执行。
       查找规则： 1. 当前项目的node_modules/.bin
                2. 全局的node_modules/.bin
                3. 环境变量
    - node_modules/bin中有三个vite文件：
                     1. unix Linux macOS默认的可执行文件
                     2. windows cmd中默认的可执行文件
                     3. Window PowerShellz中可执行文件，可跨平台
