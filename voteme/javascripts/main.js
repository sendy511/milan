$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var userId = $.urlParam("userId");
var voted = false;

function loadCount(){
	$.getJSON("http://chaxun.1616.net/s.php?type=ip&amp;output=json&amp;callback=?&amp;_=1", 
		function(data){
			var count = parseInt(data);
			$("#bless-summary-number").text(count);
		}
	);
}

function clickBless(){
	if(voted){
		alert('您已经送过祝福了！');
	}
	else{
		//
		alert('谢谢您的祝福，祝您开心快乐！');
		var currentCount = parseInt($("#bless-summary-number").text());
		$("#bless-summary-number").text(currentCount + 1);
		voted = true;
	}
}