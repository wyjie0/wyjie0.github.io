//界面跳转
function interfaceJump() {
	self.location = 'playLevelOne.html';//默认开始第一关
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

//查看游戏帮助
function gameHelp() {
	alert("欢乐的农场里突然出现一批地鼠，希望身手敏捷的你能在一定时间内消灭更多" +
			"的地鼠，来使农民的庄稼不受损失!\n" + 
			"这是一款小巧轻量的打地鼠游戏，无聊的时候就来打地鼠吧。\n点击图中出现的地鼠即可。\n" + 
			"可选择游戏的难度，一共有十个游戏难度。也可以设置打开或关闭背景音乐。\n");
}
