# wechaty_pay
![](https://raw.githubusercontent.com/chatie/wechaty/master/image/wechaty-logo-en.png)
  Wechaty_Pay是一个基于基于wechaty的应用，主要实现付费入群的功能，即用户输入指定口令，根据提示完成付费操作后即可入群。<br/>
## 运行需要
*  wechaty，从 https://github.com/Chatie/wechaty 下载最新的wechaty，并保证能够正常运行^_^<br/>
*  安装MySQL数据库(MySQL 5.1及以上版本)。运行grouponfee.sql，将运行所需要的数据库表导入MySQL数据库。同时，根据需要将pay_in.js文件中连接数据库的用户名和密码进行修改。<br/>
```javascript
//创建和数据库的连接
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'grouponfee'
})
```
## 使用指南
*  用户发送'hello'或者'你好', 回复"你好，我是本次NodeJS技术学习交流群的机器Nancy，请输入暗号【nodejs】，我将拉你进入会员群"。<br/>
*  用户发送'nodejs'或者'完成'<br/>
    --  若用户已经在会员群，回复"检测到你已经在群里啦！"，并在会员群提示<br/>
    --  若用户还未支付，发送支付链接给用户并提示"请您点击下面的链接完成付款操作，付款成功后记得回复我'完成'哦，之后我好将您拉入会员群"<br/>
    --  若用户已完成支付，回复"Nancy检测到你已经成功付款，正准备将您拉入群聊，稍安勿躁哦~",将用户拉入会员群并提示“欢迎加入NodeJS技术学习社群”<br/>
## 使用截图
![](https://github.com/baiyung/wechaty_pay/blob/master/image/使用流程.jpg)
<div align="center">
<a target="_blank" href="https://github.com/baiyung/wechaty_pay/blob/master/image/使用流程展示.mp4"><img src="https://raw.githubusercontent.com/chatie/wechaty/master/image/wechaty-logo-en.png" border=0 width="60%"></a>
</div>
## 说明
本应用中的付费链接(payment.html)是根据测试需要写出的html页面，并不是真实的微信支付链接，使用时可根据需要修改。
