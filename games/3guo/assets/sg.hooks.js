var SG_Hooks = {
    debug : true,
    
	getLanguage : function( supportedLanguages ){
		return SG.initLangs(supportedLanguages);
	},
	
	start : function(){
        SG_Hooks.debug && console.log('game started');
        SG.trigger({type:'start'});
	},
	
	levelUp : function( level, score, callback){
        SG_Hooks.debug && console.log('level up:' + level + '/' + score);
		SG.trigger({type:'levelUp', level:level, lastLevelScore:score}, callback);
	},
	
	gameOver : function( level, score, callback){
        var str = "我奮力殺退了"+score+"人，快頂不住了，夥伴們快來幫忙！";
        SG_Hooks.debug && console.log('game over:' + level + '/' + score);
		SG.trigger({type:'gameOver', score:score}, callback);
		dp_submitScore(score);
	},
	
    gameCompleted : function( score, callback ){
        SG_Hooks.debug && console.log('game completed:' + score);
        SG.trigger({type:'gameCompleted', score:score}, callback);
    },
    
    gamePause : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('game pause:' + state);
        SG.trigger({type:'gamePause', state:state}, callback);
    },
    
    gameRestart : function( callback ){
        SG_Hooks.debug && console.log('game restart:');
        SG.trigger({type:'gameRestart'}, callback);
    },
    
    selectMainMenu : function(callback){
        SG_Hooks.debug && console.log('selectMainMenu:');
        SG.trigger({type:'selectMainMenu'}, callback);
    },
    
    selectLevel : function( level, callback ){
        SG_Hooks.debug && console.log('selectLevel:'+level);
        SG.trigger({type:'selectLevel', level:level}, callback);
    },
    
    setSound : function( state, callback ){ // state: on|off
        SG_Hooks.debug && console.log('setSound:'+state);
        SG.trigger({type:'gameCompleted', state:state}, callback);
    },
    
    setOrientationHandler : function( f ){
		SG.setOrientationHandler( f );
	},
	
	setResizeHandler: function ( f ){
		SG.setResizeHandler(f);
	}
};
