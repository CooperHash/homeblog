# HomeBlog
https://hzk.homeblog.top


## 技术栈

```
vue cli4 + vue Router + vuex + webpack + express + MySQL serverless
```

## 页面

1. 首页动态
2. 添加文章
3. 文章列表展示
4. 文章展示
5. 书籍展示
6. 书籍书评展示
7. 语言展示

<br>

## 功能及布局

1. 文章首页引入 lodash 进行文章检索的防抖
2. 语言板块用flex wrap进行宫格布局
3. 日语文章内的音频使用blob链接转化
4. 用伪类及css绑定attr进行动态数组绑定（在不改动业务逻辑的情况下，添加移动端的书籍简介展示）

<br>

## 项目优化

### 分割代码之前

<img src="https://cdn.homeblog.top/uPic/sOBylz.png"/>

<br>

### 分割代码后

<img src="https://cdn.homeblog.top/uPic/zwnez4.png"/>

网页请求的TTFB也快了许多

<br>

### 延迟加载css

首屏加载不需要的css文件延迟加载

<img src="https://cdn.homeblog.top/uPic/HRT4jY.png"/>

<br>

### 图片优化

<img src="https://cdn.homeblog.top/uPic/mdOdNB.png">

<br>

## 项目架构

### 一、数据库

> | 表名      | 介绍             |
> | --------- | ---------------- |
> | article   | 前端的技术文章   |
> | network   | 计算机网络的文章 |
> | language  | 语言板块         |
> | recent    | 个人动态         |
> | book      | 书库             |
> | operation | 操作系统的文章   |

<br>

### 二、API文档

<div><a href="https://documenter.getpostman.com/view/15325162/UVsLSSSn">API文档</div>

<br>

### 三、页面

<img src="https://cdn.homeblog.top/uPic/Kr56yG.png">



<br>

## 自动化部署

### 前端

> 采用 scp2 进行 ssh 与服务器的连接，进行 vue 项目打包的 dist 文件进行上传，实现全自动【先删除掉网站在服务器的文件，再传输上去】

<img src="https://cdn.homeblog.top/uPic/NT5aJr.png">

### 后端

> 采用微信云托管，代码放在GitHub上，有更新的时候，进行流水线更新

<img src="https://cdn.homeblog.top/uPic/mBQV7h.png">\

<br>

## 我的主旨

> 技术只是表现更深层次内涵，更深内核的一种表现形式，突破技术的桎梏，才是我的目标，元歌有句话很有意思：忘记那些复杂的技巧，你将得到真正的美。
