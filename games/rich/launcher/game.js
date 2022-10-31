var XiaobinTool = function() {
	function t() {}
	return t.createBitmapByName = function(t) {
		var e = new egret.Bitmap;
		return t = RES.getRes(t),
		e.texture = t,
		e
	},
	t.creatMovieClip = function(t, e, i) {
		return void 0 === i && (i = ""),
		t = RES.getRes(t),
		e = RES.getRes(e),
		e = new egret.MovieClip(t, e),
		e.frameRate = 60,
		e.gotoAndPlay(i),
		e
	},
	t.hitTest = function(t, e) {
		var i = t.getBounds(),
		s = e.getBounds();
		return i.x = t.x,
		i.y = t.y,
		s.x = e.x,
		s.y = e.y,
		i.intersects(s)
	},
	t.checkArrRecover = function(t, e) {
		if (0 == t.length) for (var i = 0; i < e.length; i++) t.push(e[i])
	},
	t.makeRandomFromArr = function(t, e) {
		this.checkArrRecover(t, e);
		var i = Math.floor(Math.random() * t.length),
		s = t[i];
		return t.splice(i, 1),
		this.checkArrRecover(t, e),
		s
	},
	t
} ();
XiaobinTool.prototype.__class__ = "XiaobinTool";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
ScoreFiveMc = function(t) {
	function e() {
		t.call(this),
		this.num = 0,
		this.theJson = "numberText_json",
		this.thePng = "numberText_png",
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
	}
	return __extends(e, t),
	e.prototype.onAddToStage = function() {
		this.tenthousandText = XiaobinTool.creatMovieClip(this.theJson, this.thePng, "n0"),
		this.addChild(this.tenthousandText),
		this.tenthousandText.x = 0,
		this.thousandText = XiaobinTool.creatMovieClip(this.theJson, this.thePng, "n0"),
		this.addChild(this.thousandText),
		this.thousandText.x = this.tenthousandText.x + this.tenthousandText.width,
		this.handredText = XiaobinTool.creatMovieClip(this.theJson, this.thePng, "n0"),
		this.addChild(this.handredText),
		this.handredText.x = this.thousandText.x + this.thousandText.width,
		this.tenText = XiaobinTool.creatMovieClip(this.theJson, this.thePng, "n0"),
		this.addChild(this.tenText),
		this.tenText.x = this.handredText.x + this.handredText.width,
		this.oneText = XiaobinTool.creatMovieClip(this.theJson, this.thePng, "n0"),
		this.addChild(this.oneText),
		this.oneText.x = this.tenText.x + this.tenText.width
	},
	e.prototype.setNum = function(t) {
		this.num = t,
		t = Math.floor(this.num / 1e4).toString(),
		this.tenthousandText.gotoAndStop("n" + t.toString()),
		"0" == t && (this.tenthousandText.visible = !1),
		t = Math.floor(this.num / 1e3).toString(),
		t = t.slice(t.length - 1, t.length),
		this.thousandText.gotoAndStop("n" + t.toString()),
		this.thousandText.visible = 0 == this.tenthousandText.visible && "0" == t ? !1 : !0,
		t = Math.floor(this.num / 100).toString(),
		t = t.slice(t.length - 1, t.length),
		this.handredText.gotoAndStop("n" + t.toString()),
		this.handredText.visible = 0 == this.tenthousandText.visible && 0 == this.thousandText.visible && "0" == t ? !1 : !0,
		t = Math.floor(this.num / 10).toString(),
		t = t.slice(t.length - 1, t.length),
		this.tenText.gotoAndStop("n" + t.toString()),
		0 == this.tenthousandText.visible && 0 == this.thousandText.visible && 0 == this.tenText.visible && "0" == t && (this.tenText.visible = !1),
		t = this.num.toString(),
		t = t.slice(t.length - 1, t.length),
		this.oneText.gotoAndStop("n" + t.toString())
	},
	e
} (egret.Sprite);
ScoreFiveMc.prototype.__class__ = "ScoreFiveMc";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
GameOverPanel = function(t) {
	function e() {
		t.call(this),
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.ats, this)
	}
	return __extends(e, t),
	e.prototype.ats = function(t) {
		this.stageW = this.stage.stageWidth,
		this.stageH = this.stage.stageHeight,
		t = new egret.Shape,
		this.addChild(t),
		t.graphics.beginFill(0, .5),
		t.graphics.drawRect(0, 0, this.stageW, this.stageH),
		t.graphics.endFill(),
		t = XiaobinTool.createBitmapByName("gameoverBg_jpg"),
		this.addChild(t);
		var e = XiaobinTool.createBitmapByName("fx_btn_png");
		this.addChild(e),
		e.anchorOffsetX = e.width / 2,
		e.x = this.stageW / 2,
		e.y = 340,
		e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doFenxiang, this),
		e.touchEnabled = !0,
		t = XiaobinTool.createBitmapByName("replay_btn_png"),
		this.addChild(t),
		t.anchorOffsetX = t.width / 2,
		t.x = this.stageW / 2,
		t.y = e.y + e.height + 10,
		t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doReplay, this),
		t.touchEnabled = !0,
		e = XiaobinTool.createBitmapByName("more_btn_png"),
		this.addChild(e),
		e.anchorOffsetX = e.width / 2,
		e.x = this.stageW / 2,
		e.y = t.y + t.height + 10,
		e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doMore, this),
		e.touchEnabled = !0
	},
	e.prototype.doAbout = function() {},
	e.prototype.doFenxiang = function() {
		dp_share();
	},
	e.prototype.doReplay = function(t) {
		console.log("doReplay"),
		t.target.parent && t.target.parent.removeChild(t.target),
		t = new egret.Event("click_replay_btn", !0),
		this.dispatchEvent(t)
	},
	e.prototype.doDownload = function() {},
	e.prototype.doMore = function() {
		clickMore();
	},
	e
} (egret.Sprite);
GameOverPanel.prototype.__class__ = "GameOverPanel";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
GameSystem = function(t) {
	function e() {
		t.call(this),
		this.isPlaying = !0,
		this.timeNum = 60,
		this.timeContentWidth = 180,
		this.powerContentWidth = 0,
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.ats, this)
	}
	return __extends(e, t),
	e.prototype.ats = function(t) {
		this.stageW = this.stage.stageWidth,
		this.stageH = this.stage.stageHeight,
		this.scoreBg = XiaobinTool.createBitmapByName("scorePanel_png"),
		this.addChild(this.scoreBg),
		this.scoreBg.x = this.scoreBg.y = 10,
		this.scoreNum = 0,
		t = new ScoreFiveMc,
		t.x = -30,
		t.y = 60,
		t.scaleX = t.scaleY = .8,
		this.addChild(t),
		t.setNum(this.scoreNum),
		this.gameScoreMc = t,
		this.timeLine = XiaobinTool.createBitmapByName("timeLine_png"),
		this.addChild(this.timeLine),
		this.timeLine.x = this.stageW - this.timeLine.width - 10,
		this.timeLine.y = 20,
		this.timeContent = XiaobinTool.createBitmapByName("timeContent_png"),
		this.addChild(this.timeContent),
		this.timeContent.x = this.timeLine.x,
		this.timeContent.y = this.timeLine.y,
		this.setTimeMasker(this.timeContentWidth),
		t = XiaobinTool.createBitmapByName("clock_png"),
		this.addChild(t),
		t.x = this.timeContent.x - 50,
		t.y = this.timeContent.y - 10;
		var e = XiaobinTool.createBitmapByName("koushao_png");
		this.addChild(e),
		e.x = t.x - 3,
		e.y = t.y + 50,
		this.powerLine = XiaobinTool.createBitmapByName("powerLine_png"),
		this.addChild(this.powerLine),
		this.powerLine.x = this.stageW - this.powerLine.width - 10,
		this.powerLine.y = 60,
		this.powerContent = XiaobinTool.createBitmapByName("powerContent_png"),
		this.addChild(this.powerContent),
		this.powerContent.x = this.powerLine.x,
		this.powerContent.y = this.powerLine.y,
		this.setPowerMasker(this.powerContentWidth)
	},
	e.prototype.setTimeMasker = function(t) {
		t = new egret.Rectangle(0, 0, t, 50),
		this.timeContent.mask = t
	},
	e.prototype.setPowerMasker = function(t) {
		t = new egret.Rectangle(0, 0, t, 50),
		this.powerContent.mask = t
	},
	e.prototype.loop = function() {
		this.timeContentWidth++,
		this.setTimeMasker(this.timeContentWidth)
	},
	e.prototype.updateScoreTxt = function() {
		this.gameScoreMc.setNum(this.scoreNum),
		100 <= this.scoreNum && 1e3 > this.scoreNum && (this.gameScoreMc.x = -25),
		1e3 < this.scoreNum && (this.gameScoreMc.scaleX = this.gameScoreMc.scaleY = .7, this.gameScoreMc.x = 5)
	},
	e.prototype.updateTimeTxt = function() {},
	e.prototype.updateHpMc = function() {
		this.hpMc.gotoAndStop("hp" + this.hpNum)
	},
	e
} (egret.Sprite);
GameSystem.prototype.__class__ = "GameSystem";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
StartBtn = function(t) {
	function e() {
		t.call(this),
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
	}
	return __extends(e, t),
	e.prototype.onAddToStage = function() {
		this.bgBMP = new egret.Bitmap,
		this.addChild(this.bgBMP),
		this.bgBMP.texture = RES.getRes("start_btn_png")
	},
	e
} (egret.Sprite);
StartBtn.prototype.__class__ = "StartBtn";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
HomePage = function(t) {
	function e() {
		t.call(this),
		this.stageH = this.stageW = 0,
		this.homePage = null,
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this)
	}
	return __extends(e, t),
	e.prototype.startGame = function(t) {
		t = XiaobinTool.createBitmapByName("homepage_jpg"),
		this.addChild(t),
		this.stageW = this.stage.stageWidth,
		this.stageH = this.stage.stageHeight,
		null == this.homePage && (this.startBtn = new StartBtn, this.addChild(this.startBtn), this.startBtn.x = (this.stageW - this.startBtn.width) / 2, this.startBtn.y = 550, this.startBtn.touchEnabled = !0, this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)),
		this.touchEnabled = !0
	},
	e.prototype.loop = function() {},
	e.prototype.onTouchBegin = function(t) {
		t.target.parent && t.target.parent.removeChild(t.target),
		t = new egret.Event("click_start_btn", !0),
		this.dispatchEvent(t)
	},
	e
} (egret.Sprite);
HomePage.prototype.__class__ = "HomePage";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
InGame = function(t) {
	function e() {
		t.call(this),
		this.stageH = this.stageW = 0,
		this.gameOver = !1,
		this.touchY = this.touchX = 0,
		this.itemArr = [],
		this.itemFrameArr = ["mi_1", "mi_2", "mi_3", "mi_4"],
		this.itemFrameInitArr = ["mi_1", "mi_2", "mi_3", "mi_4"],
		this.queueItemArr = [],
		this.showDataArr = [],
		this.queueFrameArr = [],
		this.queueFrameInitArr = [],
		this.moveTime = 200,
		this.moving = !1,
		this.shakeTime = this.clickYesCount = 0,
		this.maxShakeTime = 30,
		this.itemStartY = 180,
		this.space = 45,
		this.gameTime = 180,
		this.powerCount = this.timeCostCount = 0,
		this.bigger = 10,
		this.inPower = !1,
		this.fastTime = 60,
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.ats, this)
	}
	return __extends(e, t),
	e.prototype.ats = function() {
		this.stageW = this.stage.stageWidth,
		this.stageH = this.stage.stageHeight,
		this.touchEnabled = !0,
		this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this),
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this),
		this.gameTimer = new egret.Timer(100),
		this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.costTime, this),
		this.gameTimer.start(),
		this.powerTimer = new egret.Timer(5e3, 1),
		this.powerTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.powerOver, this),
		this.initGame()
	},
	e.prototype.powerOver = function() {
		this.inPower = !1,
		this.powerMc.gotoAndStop("blank")
	},
	e.prototype.costTime = function() {
		if (0 < this.gameTime && (this.timeCostCount += 1, this.gameTime -= .5, this.gameSystemPanel.setTimeMasker(this.gameTime), 0 == this.gameTime)) {
			this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.costTime, this),
			console.info("gameOver = " + this.timeCostCount);
			var t = XiaobinTool.createBitmapByName("timeUp_png");
			this.addChild(t),
			t.anchorOffsetX = t.width / 2,
			t.anchorOffsetY = t.height / 2,
			t.x = this.stageW / 2,
			t.y = 300,
			t.scaleX = t.scaleY = .1,
			egret.Tween.get(t).to({
				scaleX: 1,
				scaleY: 1
			},
			500, egret.Ease.backOut),
			this.gameOver = !0,
			t = new egret.Timer(2e3, 1),
			t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.makeGameOver, this),
			t.start(),
			this.timeOverSound.play()
		}
	},
	e.prototype.initGame = function() {
		this.curNum = 2,
		this.clickTime = this.fastTime,
		this.creatBg(),
		this.creatLookItem(),
		this.showItem(),
		this.creatButtons(),
		this.makeQueue(),
		this.updateQueue(),
		this.makeTimer(),
		this.creatGameSystemPanel(),
		this.creatMusic(),
		this.creatSmokeMc(),
		this.makePowerMc()
	},
	e.prototype.creatSmokeMc = function() {
		var t = this.queueItemArr.length - 1;
		this.smokeMc = XiaobinTool.creatMovieClip("smoke_json", "smoke_png", "blank"),
		this.addChild(this.smokeMc),
		this.smokeMc.x = this.stageW / 2,
		this.smokeMc.y = this.queueItemArr[t].y,
		this.smokeMc.frameRate = 30
	},
	e.prototype.makePowerMc = function() {
		this.powerMc = XiaobinTool.creatMovieClip("powerMc_json", "powerMc_png", "blank"),
		this.addChild(this.powerMc),
		this.powerMc.x = this.stageW / 2,
		this.powerMc.y = this.stageH / 2,
		this.powerMc.frameRate = 30
	},
	e.prototype.creatMusic = function() {
		this.bgMusic = RES.getRes("mscNormal"),
		this.bgMusic.play(),
		this.bgMusic.addEventListener("ended", this.rePlay.bind(this)),
		this.wSound = RES.getRes("sndFail"),
		this.ySound1 = RES.getRes("sndSucc1"),
		this.ySound2 = RES.getRes("sndSucc2"),
		this.ySound3 = RES.getRes("sndSucc3"),
		this.timeOverSound = RES.getRes("sndOver")
	},
	e.prototype.rePlay = function() {
		this.bgMusic.load(),
		this.bgMusic.play()
	},
	e.prototype.creatGameSystemPanel = function() {
		this.gameSystemPanel = new GameSystem,
		this.addChild(this.gameSystemPanel)
	},
	e.prototype.makeTimer = function() {
		this.timer = new egret.Timer(this.moveTime + 10, 1),
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this)
	},
	e.prototype.timerComFunc = function() {
		console.log("\u8ba1\u65f6\u7ed3\u675f"),
		this.tweenComplete()
	},
	e.prototype.updateQueue = function() {
		for (var t = 0; 7 > t; t++) this.queueItemArr[t].gotoAndStop(this.showDataArr[t]);
		t = this.queueItemArr.length - 1,
		this.queueItemArr[t].gotoAndStop("y" + this.showDataArr[t])
	},
	e.prototype.makeQueue = function() {
		for (var t = 0; 7 > t; t++) {
			var e = XiaobinTool.makeRandomFromArr(this.queueFrameArr, this.queueFrameInitArr).toString();
			this.showDataArr.push(e)
		}
		for (console.log("this.showDataArr = " + this.showDataArr), t = 0; 7 > t; t++) e = XiaobinTool.creatMovieClip("item_json", "item_png", "blank"),
		this.addChild(e),
		e.x = this.stageW / 2,
		e.y = this.itemStartY + t * (2.5 * t + this.space),
		e.scaleX = e.scaleY = (t + 4) / this.bigger,
		this.queueItemArr.push(e)
	},
	e.prototype.creatButtons = function() {
		this.leftBtn = XiaobinTool.creatMovieClip("left_btn_json", "left_btn_png", "left_btn_yes"),
		this.addChild(this.leftBtn),
		this.leftBtn.x = this.leftBtn.width / 2 + 10,
		this.leftBtn.y = 640,
		this.leftBtn.touchEnabled = !0,
		this.rightBtn = XiaobinTool.creatMovieClip("right_btn_json", "right_btn_png", "right_btn_yes"),
		this.addChild(this.rightBtn),
		this.rightBtn.x = this.stageW - this.rightBtn.width / 2 - 10,
		this.rightBtn.y = 640,
		this.rightBtn.touchEnabled = !0
	},
	e.prototype.creatLookItem = function() {
		for (var t = 0; 4 > t; t++) {
			var e = XiaobinTool.creatMovieClip("item_json", "item_png", "blank");
			switch (this.addChild(e), t) {
			case 0:
				e.x = 50,
				e.y = 500;
				break;
			case 1:
				e.x = this.stageW - 50,
				e.y = 500;
				break;
			case 2:
				e.x = 50,
				e.y = 300;
				break;
			case 3:
				e.x = this.stageW - 50,
				e.y = 300
			}
			this.itemArr.push(e)
		}
	},
	e.prototype.showItem = function() {
		if (2 == this.curNum) {
			var t = XiaobinTool.makeRandomFromArr(this.itemFrameArr, this.itemFrameInitArr).toString(),
			e = XiaobinTool.makeRandomFromArr(this.itemFrameArr, this.itemFrameInitArr).toString();
			this.itemArr[0].gotoAndStop(t),
			this.itemArr[1].gotoAndStop(e),
			this.itemArr[0].x += 30,
			this.itemArr[1].x -= 30,
			this.itemArr[0].scaleX = this.itemArr[0].scaleY = .8,
			this.itemArr[1].scaleX = this.itemArr[1].scaleY = .8,
			this.queueFrameArr.push(t, e),
			this.queueFrameInitArr.push(t, e)
		}
	},
	e.prototype.creatBg = function() {
		this.bg = XiaobinTool.createBitmapByName("bg_jpg"),
		this.addChild(this.bg)
	},
	e.prototype.makeGameOver = function() {
		var t = new GameOverPanel;
		this.addChild(t);
		var e = this.gameSystemPanel.scoreNum;
		dp_submitScore(e)
	},
	e.prototype.onTouchBegin = function(t) {
		if (this.touchX = t.stageX, this.touchY = t.stageY, 1 != this.gameOver && 0 == this.shakeTime && 0 == this.moving) if ("mi_5" == this.showDataArr[this.showDataArr.length - 1]) this.doClickYes();
		else if (t.target == this.leftBtn || t.target == this.rightBtn) {
			switch (t.target) {
			case this.leftBtn:
				this.clickBtnNum = 0;
				break;
			case this.rightBtn:
				this.clickBtnNum = 1
			}
			t.target.scaleX = t.target.scaleY = .85,
			this.checkValue()
		}
	},
	e.prototype.checkValue = function() {
		var t = this.showDataArr[this.showDataArr.length - 1];
		console.log(t),
		console.log(this.queueFrameInitArr[this.clickBtnNum]),
		t == this.queueFrameInitArr[this.clickBtnNum] || t == this.queueFrameInitArr[this.clickBtnNum + 2] ? (console.log(" YES CLICK ! "), this.doClickYes(), .3 > Math.random() ? this.ySound1.play() : .6 > Math.random() ? this.ySound2.play() : this.ySound3.play()) : (console.log(" NO CLICK ! "), this.clickTime = 0, this.wSound.play(), this.shakeTime = this.maxShakeTime, t = this.queueItemArr.length - 1, this.queueItemArr[t].gotoAndStop("w" + this.showDataArr[t]))
	},
	e.prototype.doClickYes = function() {
		1 == this.inPower ? this.clickYesCount += 2 : this.clickYesCount++,
		this.gameSystemPanel.scoreNum = 10 * this.clickYesCount,
		this.gameSystemPanel.updateScoreTxt(),
		this.powerCount++,
		this.gameSystemPanel.powerContentWidth = 10 * this.powerCount,
		this.gameSystemPanel.setPowerMasker(this.gameSystemPanel.powerContentWidth),
		180 < this.gameSystemPanel.powerContentWidth && (this.gameSystemPanel.powerContentWidth = 0, this.gameSystemPanel.setPowerMasker(this.gameSystemPanel.powerContentWidth), this.powerCount = 0, this.powerTimer.start(), this.inPower = !0, this.powerMc.gotoAndPlay("showPower")),
		this.checkAddItem(),
		this.queueItemArr[this.queueItemArr.length - 1].gotoAndStop("blank"),
		this.smokeMc.gotoAndPlay("playSmoke"),
		0 < this.clickTime && this.creatCombo(),
		this.clickTime = this.fastTime,
		this.makeTween(),
		this.moving = !0
	},
	e.prototype.creatCombo = function() {
		var t = XiaobinTool.createBitmapByName("combo_png");
		this.addChild(t),
		t.anchorOffsetX = t.width / 2,
		t.x = this.stageW / 2,
		t.y = this.queueItemArr[this.queueItemArr.length - 1].y,
		t.scaleX = t.scaleY = .1,
		t.rotation = 0,
		t.alpha = 0,
		egret.Tween.get(t).to({
			y: t.y - 20 * Math.random(),
			scaleX: 1,
			scaleY: 1,
			rotation: -15 + 30 * Math.random(),
			alpha: 1
		},
		300, egret.Ease.backOut).call(this.comboOver, this, [t])
	},
	e.prototype.comboOver = function(t) {
		t.parent && t.parent.removeChild(t)
	},
	e.prototype.checkAddItem = function() {
		if (5 == this.clickYesCount) {
			this.curNum++;
			var t = XiaobinTool.makeRandomFromArr(this.itemFrameArr, this.itemFrameInitArr).toString();
			this.itemArr[2].gotoAndStop(t),
			this.itemArr[2].scaleX = .8,
			this.itemArr[2].scaleY = .8,
			this.itemArr[2].x += 30,
			this.queueFrameArr.push(t),
			this.queueFrameInitArr.push(t)
		}
		10 == this.clickYesCount && (this.curNum++, t = XiaobinTool.makeRandomFromArr(this.itemFrameArr, this.itemFrameInitArr).toString(), this.itemArr[3].gotoAndStop(t), this.itemArr[3].scaleX = .8, this.itemArr[3].scaleY = .8, this.itemArr[3].x -= 30, this.queueFrameArr.push(t), this.queueFrameInitArr.push(t))
	},
	e.prototype.makeTween = function() {
		for (var t = 0; 6 > t; t++) {
			var e = this.queueItemArr[t + 1];
			egret.Tween.get(this.queueItemArr[t]).to({
				x: e.x,
				y: e.y,
				scaleX: e.scaleX,
				scaleY: e.scaleY
			},
			this.moveTime, egret.Ease.backOut),
			this.timer.start()
		}
	},
	e.prototype.tweenComplete = function() {
		console.log("\u79fb\u52a8\u5b8c\u6210"),
		this.moving = !1,
		this.smokeMc.gotoAndStop("blank");
		for (var t = 0; 6 > t; t++) {
			var e = this.queueItemArr[t];
			e.x = this.stageW / 2,
			e.y = this.itemStartY + t * (2.5 * t + this.space),
			e.scaleX = e.scaleY = (t + 4) / this.bigger
		}
		this.makeNextData(),
		this.updateQueue()
	},
	e.prototype.makeNextData = function() {
		if (this.showDataArr.pop(), 0 == this.clickYesCount % 3) this.showDataArr.unshift("mi_5");
		else {
			var t = XiaobinTool.makeRandomFromArr(this.queueFrameArr, this.queueFrameInitArr).toString();
			this.showDataArr.unshift(t)
		}
	},
	e.prototype.onTouchEnd = function(t) {
		this.touchX = t.stageX,
		this.touchY = t.stageY,
		this.leftBtn.scaleX = this.leftBtn.scaleY = 1,
		this.rightBtn.scaleX = this.rightBtn.scaleY = 1
	},
	e.prototype.loop = function(t) {
		0 < this.clickTime && this.clickTime--,
		0 < this.shakeTime ? (this.shakeTime--, this.queueItemArr[this.queueItemArr.length - 1].x = this.stageW / 2 + ( - this.shakeTime / 2 + this.shakeTime * Math.random()), 1 == this.shakeTime && (t = this.queueItemArr.length - 1, this.queueItemArr[t].gotoAndStop("y" + this.showDataArr[t]))) : this.shakeTime = 0
	},
	e
} (egret.Sprite);
InGame.prototype.__class__ = "InGame";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
LoadingUI = function(t) {
	function e() {
		t.call(this),
		this.createView()
	}
	return __extends(e, t),
	e.prototype.createView = function() {
		this.textField = new egret.TextField,
		this.addChild(this.textField),
		this.textField.y = 200,
		this.textField.width = 480,
		this.textField.height = 100,
		this.textField.size = 15,
		this.textField.textAlign = "center",
		this.graphics.clear(),
		this.graphics.beginFill(3355443, 1),
		this.graphics.drawRect(0, 500, 480, 10),
		this.graphics.endFill()
	},
	e.prototype.setProgress = function(t, e) {
		this.textField.text = "Loading..." + t + "/" + e,
		this.graphics.beginFill(15658734, 1),
		this.graphics.drawRect(0, 500, t / e * 480, 10),
		this.graphics.endFill(),
		this.pic && (this.pic.x = t / e * 480, this.pic.y = 400)
	},
	e.prototype.onConfigComplete = function() {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
		RES.loadGroup("loading")
	},
	e.prototype.onResourceLoadComplete = function(t) {
		"loading" == t.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), this.createPic())
	},
	e.prototype.createPic = function() {},
	e
} (egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
var __extends = this.__extends ||
function(t, e) {
	function i() {
		this.constructor = t
	}
	for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
	i.prototype = e.prototype,
	t.prototype = new i
},
MainGame = function(t) {
	function e() {
		t.call(this),
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
	}
	return __extends(e, t),
	e.prototype.onAddToStage = function() {
		this.loadingView = new LoadingUI,
		this.stage.addChild(this.loadingView),
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
		RES.loadConfig("resource/resourceGame.json", "resource/")
	},
	e.prototype.onConfigComplete = function() {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
		RES.loadGroup("preloadGame")
	},
	e.prototype.onResourceLoadComplete = function(t) {
		"preloadGame" == t.groupName && RES.loadGroup("buttons"),
		"buttons" == t.groupName && RES.loadGroup("pics"),
		"pics" == t.groupName && (this.stage.removeChild(this.loadingView), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), this.createGameScene(), console.dir("init"))
	},
	e.prototype.onResourceProgress = function(t) {
		"preload" == t.groupName && this.loadingView.setProgress(t.itemsLoaded, t.itemsTotal)
	},
	e.prototype.createGameScene = function() {
		null == this.homepage && (this.homepage = new HomePage),
		this.addChild(this.homepage),
		this.addEventListener("click_start_btn", this.createIngame, this),
		this.addEventListener("click_replay_btn", this.doReplay, this)
	},
	e.prototype.doReplay = function() {
		null != this.ingame && (this.removeChild(this.ingame), this.ingame = null),
		null == this.ingame && (this.ingame = new InGame, this.addChild(this.ingame))
	},
	e.prototype.createIngame = function() {
		this.removeEventListener("click_start_btn", this.createIngame, this),
		console.log("createIngame"),
		null != this.homepage && (this.removeChild(this.homepage), this.homepage = null),
		null == this.ingame && (this.ingame = new InGame, this.addChild(this.ingame))
	},
	e
} (egret.DisplayObjectContainer);
MainGame.prototype.__class__ = "MainGame";