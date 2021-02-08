### wdw-music-一个基于vue的高仿网易云音乐网站

#### (http://8.129.133.120/)
(线上演示地址，由于太菜了跨域什么的没有做好，线上地址可能会有一些数据请求不到，后面我会完善的！！)

#### 前言

本人大三前端菜鸡一只，想自己做一个拿得出手的项目，网上看来看去不是管理系统就是什么商城之类的，没有多大兴趣，偶然间看到github有提供网易云音乐接口，然后看了看别人的作品不禁投出羡慕，想着要是自己能做一个这个该多有成就感，想着想着就开始肝代码了hh。
肝代码不易，跪求各位大佬去github上给个star。在网上转载或调用请标明出处，该项目仅供学习！！！！！！！

[Github仓库](https://github.com/sanbinlbw/wdw-music)


#### 项目简介

本项目后端接口是Github Binaryify的开源项目（[后端仓库地址](https://github.com/Binaryify/NeteaseCloudMusicApi)），接口文档直接在百度搜索“网易云音乐API”作者是Binaryify。

本项目前端均是本人独立自主开发，所用技术栈：Vue全家桶+elementUi+axios。

因为网页渲染可能会比较慢，图片加载请耐心等候，或者刷新
[项目演示](https://www.bilibili.com/video/BV13p4y1p76G?from=search&seid=1144058164303611817) 随手点个赞吧

## 快速启动

`当前项目目录下,路径输入cmd进入命令行`

当前目录终端```
npm install     # 安装项目所需的依赖(如果速度过慢, 可以尝试cnpm或者使用代理)
npm run serve   #启动项目服务
```

浏览器打开输入http://localhost:8080网站就能打开哟(注意查看main.js的路径查看接口地址，localhost:3000是后端下载到本地开启，使用云端的api的话需要去配置哦，配置目录node_modules>@vue>cli-service>lib>option.js,找到devServer,修改为
      devServer: {
        disableHostCheck: true,
        proxy: { //解决跨域问题
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
                target: 'https://autumnfish.cn/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        port: 8081
    })
不要直接使用云端地址哦，不然会有跨域问题。

 **API安装步骤：** 

1. git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

(不会使用git的小伙伴可以直接去上面的接口仓库下载接口哦)

2. npm install

3.cd api文件夹

4.node app.js





#### 关于本项目

本项目还有许多值得改进的地方，各位小伙伴们有好的意见或者遇到什么问题欢迎评论或者加vx：crlshihb 一起讨论哦， 


项目下一步方向：实现其他的小功能，封装请求，增加二维码登录等操作

项目中会遇到的坑和bug只要发现都有填和修复哦

#### 有增加一个小彩蛋 

在搜索栏输入 @crl是个憨批@ 即可出现彩蛋哦
如果不喜欢这个效果的话，在搜索栏输入 @crl不是憨批@ 即可关闭
