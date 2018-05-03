var tl, jg, sc, djs_span, df_span, ksBtn, ztBtn, tzBtn, returnButton, musicBtn;
var imgs;
var djs_id, jg_id, tl_id, play_id;
var isStart; //判断是否开始
var firstZT = true; //游戏刚开始不能暂停
var isZT = false;
var isBSOff = false;
var djs_data; //倒计时的时间
var jxGame_sc; //继续游戏的总时长
var isOneStart = true; //判断是否为第一次开始

var bestScore = 0; //最高分
var bestScoreDiv;

var databaseLevel;
var databaseScore;
var user;

var dz = 0,
	ld = 0,
	df = 0;
window.onload = function() {
	//获取HTML元素
	tl = document.getElementById("tl");
	jg = document.getElementById("jg");
	sc = document.getElementById("sc");
	djs_span = document.getElementById("djs");
	df_span = document.getElementById("defen");
	ksBtn = document.getElementById("ksBtn");
	ztBtn = document.getElementById("ztBtn");
	tzBtn = document.getElementById("tzBtn");
	returnButton = document.getElementById("returnButton");
	musicBtn = document.getElementById("musicBtn");
	imgs = document.images;
	zt_div = document.getElementById("zt_div");

	bestScoreDiv = document.getElementById("bestScore"); //记录最高得分

	databaseLevel = document.getElementById("databaseLevel");
	databaseScore = document.getElementById("databaseScore");
	user = document.getElementById("User");

	jinzhi();

	//	if(firstZT == true) {
	//		ztBtn.disabled = true;
	//	}
	//游戏开始事件
	ksBtn.onclick = function() {
		tl_time = parseInt(tl.value); //停留时间
		jg_time = parseInt(jg.value); //间隔时间
		sc_time = parseInt(sc.value); //游戏时长

		//设置第一次开始游戏
		isOneStart = true;
		firstZT = false;
		//记录游戏开始时间
		start_Time = new Date();
		
		
		
		//执行倒计时方法
		djs();
		//执行地鼠出现的方法
		mouse_show();
		//初始化最高分
		initBestScore();

		//禁止用户操作输入框
		isStart = true;
		ksBtn.disabled = true;
		//		jinzhi();
	}

	//游戏暂停事件
	ztBtn.onclick = function() {

		if(isZT) {
			//继续游戏
			isOneStart = false;
			zt_div.style.display = "none";
			ztBtn.textContent = "暂停游戏";
			isZT = false;

			//继续游戏开始的时间
			jxGame_startTime = new Date();
			game_jx();
			//执行地鼠出现的方法
			qingchang();
			mouse_show();

			//进制用户操作输入框
			//			jinzhi();
		} else {
			//暂停游戏
			game_zt();
		}
	}

	//游戏结束事件
	tzBtn.onclick = function() {

		var r = confirm("确定重新开始本次游戏？");

		if(r == true) {
			game_over();
			window.history.back();
			location.reload();
		}

		//   			jinzhi();
	}

	//返回游戏主菜单时间
	returnButton.onclick = function() {

		if(df > bestScore) {
			localStorage.setItem('bestScore', df);
			initBestScore();
		}

		var r = confirm("确定退出本次游戏？");

		if(r == true) {
			alert("游戏结束\n" + document.getElementById("defen").innerText);
			game_over();
			//self.location = "index.html";
			if(window.history.length > 3) {
				window.history.go(-2);
			} else {
				window.location.href = "index.html";
				document.URL = location.href;
				//window.location.reload(true);
			}

		}
	}

	musicBtn.onclick = function() {
		var music = document.getElementById("music");
		
/*		if(isBSOff == true) {
			
		}*/
		if(music.paused) {
			music.play();
			musicBtn.textContent = "关闭背景音乐";
		} else {
			musicBtn.textContent = "打开背景音乐";
			music.pause();
		}
	}
}

//初始化最高分
function initBestScore() {
	bestScore = localStorage.getItem('bestScore') || 0;
	bestScoreDiv.innerHTML = bestScore;
}

//倒计时方法
function djs() {
	//实时记录游戏时间
	var game_time = new Date();
	//计算倒计时

	djs_data = sc_time - parseInt((game_time - start_Time) / 1000);

	//显示倒计时
	djs_span.innerHTML = djs_data;

	if(djs_data < 1) {

		if(df > bestScore) {
			localStorage.setItem('bestScore', df);
			initBestScore();
		}

		var r = confirm("游戏结束, 返回主菜单？");
		
		if(r == true) {
			alert("游戏结束\n" + document.getElementById("defen").innerText);
			game_over();
			self.location = "index.html";
		} else {
			alert("游戏结束\n" + document.getElementById("defen").innerText);
			game_over();
			return;
		}
	}

	//倒计时的计数器
	djs_id = setTimeout("djs()", 1000);
}

//游戏暂停方法
function game_zt() {
	clearTimeout(djs_id);
	clearTimeout(jg_id);
	clearTimeout(tl_id);
	if(!isOneStart) {
		clearTimeout(jxDJS_id);
	}
	zt_div.style.display = "block";
	ztBtn.textContent = "继续游戏";
	isZT = true;

	//获取倒计时，作为继续游戏的总时长
	jxGame_sc = djs_data;
}

//游戏继续方法
function game_jx() {
	//继续游戏进行时
	var jxGame_timming = new Date();

	//重新计算倒计时
	if(firstZT == true) {
		var game_time = new Date();
		//计算倒计时

		djs_data = sc_time - parseInt((game_time - start_Time) / 1000);

		//显示倒计时
		djs_span.innerHTML = djs_data;
	} else {
		djs_data = jxGame_sc - parseInt((jxGame_timming - jxGame_startTime) / 1000);
		djs_span.innerHTML = djs_data;
	}

	if(djs_data < 1) {

		//记录最高分
		if(df > bestScore) {
			localStorage.setItem('bestScore', df);
			initBestScore();
		}

		var r = confirm("游戏结束, 返回继续游戏？");
		if(r == true) {
			alert("游戏结束\n" + document.getElementById("defen").innerText);
			game_over();
			self.location = "index.html";
		} else {
			alert("游戏结束\n" + document.getElementById("defen").innerText);
			game_over();
			return;
		}
	}

	jxDJS_id = setTimeout("game_jx()", 1000);
}

//游戏结束

function game_over() {
	clearTimeout(tl_id);
	clearTimeout(jg_id);
	clearTimeout(djs_id);
	clearTimeout(play_id);
	if(!isOneStart) {
		clearTimeout(jxDJS_id);
	}
	isStart = false;
	djs_span.innerHTML = 0;
	df_span.innerHTML = 0;

	//恢复游戏场地
	zt_div.style.display = "none";

	//地鼠清场
	qingchang();
	ksBtn.disabled = false;
	//	jinzhi();
}

//地鼠清场
function qingchang() {
	for(var i = 0; i < imgs.length; i++) {
		imgs[i].src = "img/1.jpg";
	}
}

//地鼠出现的方法
function mouse_show() {
	//生成随机的数组下标
	var i = parseInt(Math.random() * imgs.length);
	//随机改变图片
	imgs[i].src = "img/2.jpg";

	//地鼠出现间隔
	jg_id = setTimeout("mouse_show()", jg_time * 1000);
	//地鼠停留时间
	tl_id = setTimeout("mouse_hide(" + i + ")", tl_time * 1000);
}

//地鼠消失，没打中
function mouse_hide(i) {
	var name = imgs[i].src.substr(imgs[i].src.length - 5, 1);

	if(name == 2) {
		imgs[i].src = "/img/1.jpg";

		//计分
		ld++;
		df_span.innerHTML = "打中" + dz + "只，得分" + df;
	}
}

//打中地鼠
function play(obj) {
	//获取图片的名称
	var name = obj.src.substr(obj.src.length - 5, 1);

	if(name == 2) {
		obj.src = "img/3.jpg";

		//计分
		dz++;
		df += 1;
		df_span.innerHTML = "打中" + dz + "只，得分" + df;

		//打中后还原
		play_id = setTimeout(function() {
			obj.src = "img/1.jpg";
			//				clearTimeout(tl_id);
		}, 500);
	}
}

//禁止用户操作方法
function jinzhi() {
	tl.disabled = true;
	jg.disabled = true;
	sc.disabled = true;

}

/*
document.addEventListener('plusready', function(){
	//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
	
});*/