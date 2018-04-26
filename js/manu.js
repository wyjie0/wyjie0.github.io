//界面跳转
function interfaceJump() {
	self.location = 'playLevelOne.html';
}

//关闭游戏界面
function closeGame() {
	
	var r = confirm("您确定要结束游戏吗？")
	
	if(r == true) {
		window.opener = null;
		window.open('','_self','');
		window.close();
	}
	
	/*
	if(navigator.userAgent.indexOf("MSIE") > 0){
		if(navigator.userAgent.indexOf("MSIE 6.0") > 0){
			window.opener = null;
			window.close();
		}
		else{
			window.open('', '_top');
			window.top.close();
		}
	}
	else if(navigator.userAgent.indexOf("Firefox") >0){
		window.location.href = 'about:blank';
	}
	else{
		window.opener = null;
		window.open('', '_self', '');
		window.close();
	}
	*/
}

//选择游戏难度
function chooseLevel() {
	self.location="chooseLevel.html";
}

//查看历史记录
function historyRecord() {
	self.location = "record.html";
}