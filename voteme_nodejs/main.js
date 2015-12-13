var http = require('http');
var fs = require('fs');

var serv = http.createServer(function(req, res)
{
	log("Incoming IP: " + getIp(req));
	log("Request Headers: " + req.rawHeaders);
	
	res.setHeader("Access-Control-Allow-Origin", "*");
  	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.writeHead(200);

	if(req.url.indexOf("getcount") !== -1 && req.url.indexOf("userId=") !== -1)
	{
		var userId = extractUserId(req);
		responseFromFile(userId, res);
	}
	else if(req.url.indexOf("increasecount") !== -1 && req.url.indexOf("userId=") !== -1){
		var userId = extractUserId(req);
		increaseCountToFile(userId, res);
	}
	else{
		res.end("ok");
	}
});

var extractUserId = function(req){
	return req.url.substring(req.url.indexOf("userId=") + "userId=".length);
};

var increaseCountToFile = function(userId, res){
   	var lines = fs.readFileSync('counter.txt', 'utf-8').toString().split("\r\n");
	var matched = false;
	var newCount = 0;
	for(i in lines) {
	    if(lines[i].split("\t")[0] == userId.toString()){
	    	newCount = 1 + parseInt(lines[i].split("\t")[1]);
			lines[i] = userId.toString() + "\t" + newCount;
			matched = true;
			break;
	    }
	}
	if(!matched){
		newCount = 1;
		lines.push(userId.toString() + "\t" + newCount);
	}
	fs.writeFileSync('counter.txt', lines.toString().replace(/\,/g, "\r\n"), 'utf-8');
	res.end(newCount.toString());
};

var responseFromFile = function(userId, res){
	var lines = fs.readFileSync('counter.txt', 'utf-8').toString().split("\r\n");
	for(i in lines) {
	    if(lines[i].split("\t")[0] == userId.toString()){
			res.end(lines[i].split("\t")[1]);
			return;
	    }
	}

	res.end("0");
};

var getIp = function(req)
{
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
};

var log = function(message){
	var now = new Date();
	console.log(now + " : " + message);
};

serv.listen(3999);
