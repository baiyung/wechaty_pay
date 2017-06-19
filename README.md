# wechaty_pay
![](https://raw.githubusercontent.com/chatie/wechaty/master/image/wechaty-logo-en.png)
  Wechaty_Pay是一个基于基于wechaty的应用，主要实现付费入群的功能，即用户输入指定口令，根据提示完成付费操作后即可入群。<br/>
## 运行需要
*  wechaty，从 https://github.com/Chatie/wechaty 下载最新的wechaty，并保证能够正常运行^_^<br/>
*  安装MySQL数据库(MySQL 5.1及以上版本)<br/>
## 使用指南
*  数据库准备。运行grouponfee.sql，将运行所需要的数据库表导入MySQL数据库。同时，根据需要将pay_in.js文件中连接数据库的用户名和密码进行修改。<br/>
```javascript
//创建和数据库的连接
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'grouponfee'
})
```

