var http = require('http');
var fs = require('fs');

var serv = http.createServer(function(req, res)
{
	log(getIp(req));
	log(req.rawHeaders);
	if(req.url.indexOf("getcount"))
	{
		if(req.url.indexOf("userId=") !== -1){
			var userId = req.url.substring(req.url.indexOf("userId=") + "userId=".length);
			responseFromFile(userId, res);
		}
	}
})

var responseFromFile = function(userId, res){
   	res.writeHead(200);

	var lines = fs.readFileSync('counter.txt', 'utf-8').toString().split("\r\n");
	for(i in lines) {
	    if(lines[i].split("\t")[0] == userId.toString()){
			res.end(lines[i].split("\t")[1]);
			return;
	    }
	}

	res.end("99");
}

var getIp = function(req)
{
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
}

var log = function(message){
	var now = new Date();
	console.log(now + " : " + message);
}

serv.listen(3000);
