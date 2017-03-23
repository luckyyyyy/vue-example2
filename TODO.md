# 商户端遇到的麻烦

* [ ] iview不成熟，遇到的麻烦很多，所以可能需要逐一解决，具体see https://github.com/iview/iview/issues/431
* [ ] ipad date组件不可点击问题 fastclick问题
* [ ] IM改名需要王川配合
* [ ] ipad自动刷新推流有待测试




# 域名方案

 * 域名DNS暂时使用`万网`，后期调研是否需要迁移到`DNSPOD`。
 * 后期调研是否需要购买解析套餐。
 * 所有域名需要申请HTTPS证书，必须备案。
 * 开发域名待定。

-----

#### 视频域名：
推流：rtmp://pub.racdn.com/watch `cname -> video-center.alivecdn.com`
直播：rtmp://v.racdn.com
点播：http://play.cacdn.com
需要 OSS+CDN+点播+直播

#### B端域名
前端访问：https://rainbowcloud.tv/store
静态资源：https://business.racdn.com
需要 OSS+CDN+ECS+SLB

#### C端域名
前端访问：https://racloud.tv
静态资源：https://customer.racdn.com
需要 OSS+CDN+ECS+SLB

#### 官网域名
前端访问：https://rainbowcloud.tv
静态资源：https://static.racdn.com
需要 OSS+CDN+ECS+SLB

#### 用户静态资源
静态资源：https://u.racdn.com/
需要 OSS+CDN

#### 后端方案
B端反向代理/api路径，使用token验证。
C端反向代理全部，使用cookie验证。


