### 注意事项
发生产前 src/store/module/user 下 的 devServer 必须改为 'prod'，测试版 随意（暂无规定，如'dev'）
uat和dev环境都是dev
com.times.microapp.AppcMember

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
测试环境打包
yarn build:test
生产环境打包
yarn build:prod
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目配置文件

src/config.js（配置开发模式token,打包类型...）

### 获取开发模式token

* POST请求
* http://m-center-uat-linli.timesgroup.cn/times/auth/oauth/token?grant_type=sms_code&client_id=app_c&client_secret=times&username=&password=&scope=all
* username  会员id对应手机号
* password  短信验证码
