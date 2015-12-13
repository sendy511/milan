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
// var counter_host_ip = "52.34.73.217";
var counter_host_ip = "localhost";
function loadCount(){
	$.getJSON("http://" + counter_host_ip + ":3999/getcount?userId=" + userId, 
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
		$.getJSON("http://" + counter_host_ip + ":3999/increasecount?userId=" + userId, 
			function(data){}
		);
		alert('谢谢您的祝福，祝您开心快乐！');
		var currentCount = parseInt($("#bless-summary-number").text());
		$("#bless-summary-number").text(currentCount + 1);
		voted = true;
	}
}