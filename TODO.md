# 商户端剩余部分
* [ ] 中控台发布公告。
* [ ] 频道页面。
* [ ] 频道设置页面。
* [ ] 账户页面。
* [ ] 数据统计页面。
* [ ] 所有文案微调。

# 商户端遇到的麻烦

* [ ] Cascader选择器无法使用表单认证。
* [ ] ipad date组件不可点击问题 fastclick问题
* [x] IM改名需要王川配合
* [x] ipad自动刷新推流有待测试，暂定30秒
* [x] 修改个人资料，radio group 不能是0，性别保密那个要改。
* [x] 侧边栏在不同路由页面下背景颜色的问题




# 域名方案

 * 域名DNS暂时使用`万网`，后期调研是否需要迁移到`DNSPOD`。
 * 后期调研是否需要购买解析套餐。
 * 所有域名需要申请HTTPS证书，必须备案。
 * 开发域名待定。

-----

#### 视频域名：
推流：rtmp://pub.racdn.com/watch `cname -> video-center.alivecdn.com`
直播：rtmp://v.racdn.com
点播：http://p.racdn.com
需要 OSS+CDN+点播+直播

#### B端域名
前端访问：https://rainbowcloud.tv/store
静态资源：https://g.racdn.com/b
需要 OSS+CDN+ECS+SLB

#### C端域名
前端访问：https://racloud.tv
静态资源：https://g.racdn.com/c
需要 OSS+CDN+ECS+SLB

#### 官网域名
前端访问：https://rainbowcloud.tv
静态资源：https://g.racdn.com/o
需要 OSS+CDN+ECS+SLB

#### 用户上传的静态资源
静态资源：https://g.racdn.com/u
需要 OSS+CDN

#### 后端方案
B端反向代理/api路径，使用token验证。
C端反向代理全部，使用cookie验证。
