彩虹云直播 - Business前端源码 (based on Vue2)
===========================

彩虹云直播 web B端，基于 [Vue2](https://vuejs.org)
核心组件包括Vuex，axios，eleme.element，vue-router

DIRECTORY STRUCTURE
-------------------

    node_modules/       contains node modules
    build/              contains webpack build script
    config/             contains build & env config
    config/             contains application configurations
    dist/               distribute path
    src/                source
        assets/         contains static(css img font)
        components/     contains vue commom components
        options/        contains static options
        store/          vuex
        views/          contains view page


INSTALLATION
------------

请在工作环境安装好 nodejs 以及 npm包管理器 并克隆仓库至本地环境
请修改npm镜像为taobao镜像 https://npm.taobao.org/
"node": ">= 4.3.0"
"npm":  ">= 3.0.0"

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
