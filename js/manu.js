//界面跳转
function interfaceJump() {
	self.location = 'play.html';
}

//关闭游戏界面
function closeGame() {
	if(confirm("您确定要结束游戏吗？")) {
		window.opener = null;
		window.open('', '_self');
		window.close();
	} else {

	}
}

//选择游戏难度
function chooseLevel() {

}

//查看历史记录
function historyRecord() {

}