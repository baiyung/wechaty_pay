const { Config,Contact,Room,Wechaty,log } = require('wechaty')
const bot = Wechaty.instance({ profile: "record" })

var mysql =  require('mysql');
                  
//创建连接
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'grouponfee'
})

//创建和服务器的链接
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/payment.html', function (req, res) {
    res.sendFile( __dirname + "/" + "payment.html" );
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

})
app.get('/process_get', function (req, res) {
	
    // 输出 JSON 格式
    var response = {
        "first_name":req.query.sign_name,
        "last_name":req.query.sign_mobile,
		"user_id":req.query.user_id
    };
    console.log(response);
	
    var  updSql = 'UPDATE pay SET real_name = ?,mobile = ?,payment = 1 WHERE contact_id = ?';//更新数据库中报名人和报名手机号
    var  updSqlParams = [req.query.sign_name,req.query.sign_mobile,req.query.user_id];
    
	pool.getConnection(function(err, connection){
		connection.query( updSql,updSqlParams,  function(err, rows){
			if(err)	{
				throw err;
			} 
		});
		connection.release();
	});
});

bot
    .on('scan', (url, code)=>{
        let loginUrl = url.replace('qrcode', 'l')
        require('qrcode-terminal').generate(loginUrl)
        console.log(url)
    })

    .on('login', user=>{
        console.log(`${user} login`)
    })

    .on('logout', (user) => {
        console.log(`${user.name()} logout!`)
        //logger.info('info', `${user.name()} logout!`)
    })

    .on('message', async function(message) {
        const room    = message.room()
        const sender  = message.from()
        const content = message.content()

        if(room){
            console.log(`Room: ${room.topic()} Contact: ${sender.name()} Content: ${content}`)
        } else{
            console.log(`Contact: ${sender.name()} Content: ${content}`)
        }

        if (message.self()) {
        	return
        }
        
	if(/hello/.test(content)|| /^你好$/.test(content)){
		message.say("你好，我是本次NodeJS技术学习交流群的机器人小N，请输入暗号【nodejs】，我将拉你进入会员群")
		var  addSql = 'INSERT INTO pay(contact_id,contact_name,payment) VALUES(?,?,0)';
		var  addSqlParams = [sender.id,sender.name()];

	        pool.getConnection(function(err, connection){  //将初次对话的id、name添入数据库，并将付款标志位置0
			connection.query( addSql,addSqlParams,function(err, rows){
				if(err)	{
					throw err;
				} 
			});
			connection.release();
		})
	}
	if(/nodejs/.test(content)|| /^完成$/.test(content)){
		let nodeRoom = await Room.find({topic: "NodeJS学习交流群"})
		if(nodeRoom){
			feeToRoom(sender,nodeRoom) 
		}
        }
    })
    .init()
    .catch(e => console.error(e))

function feeToRoom(contact,room){
	log.info('Bot', 'feeToRoom(%s)', contact.name(),room.topic())
    if (room.has(contact)) {//如果群里已经有该用户，则回复无需再支付
		log.info('Bot', 'onMessage: sender has already in nodeRoom')
        contact.say("检测到你已经在群里啦！")
        room.say("找不到这个群了，我来这里冒个泡，帮他下", contact)
    }else {        
		let id = contact.id
		let tmplink = 'http://192.168.31.214:3000/payment.html?user_id=' + id
		var  sql = 'select * from pay where contact_id = ? and contact_name = ? and payment = 1';
		var  selSqlParams = [contact.id,contact.name()];
  
		pool.getConnection(function(err, connection){
			connection.query(sql,selSqlParams, function(err, rows){
				if(err)	{
					console.log('[SELECT ERROR] - ',err.message);
					return;
				}
			
				if(rows == 0){//用户还未支付，将支付链接发给用户
					contact.say('请您点击下面的链接完成付款操作，付款成功后记得回复我“完成”哦，之后我好将您拉入会员群')
					contact.say(tmplink)
				}else{//用户完成支付，将用户拉入指定群组
						//console.log("数据库信息~~~~~~~~" + rows)
						contact.say("小N检测到你已经成功付款，正准备将您拉入群聊，稍安勿躁哦~")
									
						putInRoom(contact, room)
					}
				});

				connection.release();
			});
		}                   
}

function putInRoom(contact, room) {
  log.info('Bot', 'putInRoom(%s, %s)', contact.name(), room.topic())

  try {
    room.add(contact)
        .catch(e => {
          log.error('Bot', 'room.add() exception: %s', e.stack)
        })
    setTimeout(_ => room.say('欢迎加入NodeJS技术学习社群', contact), 1000)
  } catch (e) {
    log.error('Bot', 'putInRoom() exception: ' + e.stack)
  }
}
