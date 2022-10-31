//

scaleValue = function(value){
    var scale = game.width / 320;
    return value * scale;
};

window.AutoScaler = function(element, initialWidth, initialHeight, skewAllowance)
{    
    var self = this;    

    this.viewportWidth = 0;
    this.viewportHeight = 0;

    if(typeof element === "string") element = document.getElementById(element);

    this.element = element;
    this.gameAspect = initialWidth / initialHeight;
    this.skewAllowance = skewAllowance || 0;

    // Ensure our element is going to behave:
    self.element.style.display = 'block';
    self.element.style.margin = '0';
    self.element.style.padding = '0';

    if(window.innerWidth == self.viewportWidth && window.innerHeight == self.viewportHeight) return;

    var w = window.innerWidth;
    var h = window.innerHeight;

    var windowAspect = w / h;
    var targetW = 0;
    var targetH = 0;

    targetW = w;
    targetH = h;

    if(Math.abs(windowAspect - self.gameAspect) > self.skewAllowance)
    {
        if(windowAspect < self.gameAspect) targetH = w / self.gameAspect;
        else targetW = h * self.gameAspect;
    }

    self.element.style.width = targetW + "px";
    self.element.style.height = targetH + "px";

    self.element.style.marginLeft = ((w - targetW) / 2) + "px";
    self.element.style.marginTop = ((h - targetH) / 2) + "px";

    self.viewportWidth = w;
    self.viewportHeight = h;    
};

//
function emptyFunc() { }

//
var game = null;
var isDoneTutorial = false;

//
var playerData = {
    totalScore: 0,
    bestScore: 0,
    currentHeroIdx: 0,
    heroes: [1, 0, 0, 0, 0, 0, 0],
    unlockedNextHero: false
};

//
var prevGameState = '';

//sfx
var sfx_punched = null;
var sfx_button_pressed = null;
var sfx_pain_echo = null;
var sfx_switch_anything = null;
var sfx_powerup_main = null;
var sfx_button_swing = null;

//
//Game states
var StartState = {
    create: startGame
};

//window.onload = function()
function startFists()
{    
    setTimeout("window.scrollTo(0, 1)", 10);
    game = new Phaser.Game(634, 960, Phaser.CANVAS, 'fistsoffrenzy-game', StartState, false, false);
}

//
function startGame()
{   
    //load SG logo
    game.load.image('sgLogo', 'assets/loading.png');

    //scale stuff
    function scaleFix()
    {        
        window.AutoScaler('fistsoffrenzy-game', 634, 960);        
    }    

    function onEnterIncorrectOrientation()
    {
        document.getElementById('incorrect-orientation').style.display = 'block';
        document.body.style.marginBottom = "0px";
    }


    function onLeaveIncorrectOrientation()
    {
        document.getElementById('incorrect-orientation').style.display = 'none';
        setTimeout("window.scrollTo(0, 1)", 10);        
    }

    if(!game.device.desktop)
    {        
        game.scale.forceOrientation(false, true);
        game.scale.enterIncorrectOrientation.add(onEnterIncorrectOrientation, this);
        game.scale.leaveIncorrectOrientation.add(onLeaveIncorrectOrientation, this);
    }

    game.scale.setResizeCallback(scaleFix, this);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize(true);    
    scaleFix();

    //
    game.stage.backgroundColor = '#000000';
    game.stage.disableVisibilityChange = true;


    
    //game states
    game.state.add('play_state', PlayState, false);
    game.state.add('game_over_state', GameOverState, false);
    game.state.add('select_hero_state', SelectHeroState, false);
    game.state.add('start_menu_state', StartMenuState, false);

    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);    

    //load assets
    loadAssets();

    //SoftGames hooks
    SG_Hooks.setOrientationHandler(onEnterIncorrectOrientation);
    SG_Hooks.setResizeHandler(scaleFix);
    
    //
    game.load.start();
}

//

function loadStart()
{

    loadText = game.add.text(game.world.centerX, game.world.centerY, '', { fill: '#ffffff' });
    loadText.anchor.setTo(0.5, 0.5);

}


//
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles)
{
    var logoImage = this.add.sprite( 300, 300, 'sgLogo');
    logoImage.anchor.set(0.5);
    logoImage.inputEnabled = true;
    logoImage.events.onInputDown.add(toPortal, this);

    loadText.setText(progress + "%");
}

function toPortal() 
{
    window.open("###", "_blank")
}

//
function loadComplete()
{
    //sfx
    if(game.device.webAudio)
    {
        var music = game.add.audio('music');
        music.onDecoded.add(function() { music.play("", 0, 1, true); }, this);

        //
        sfx_button_pressed = game.add.audio('button_pressed');
        sfx_punched = new Array(4);
        for(var i = 0; i < 4; i++) sfx_punched[i] = game.add.audio('punched' + (i + 1).toString());
        sfx_pain_echo = game.add.audio('pain_echo');
        sfx_switch_anything = game.add.audio('switch_anything');
        sfx_powerup_main = game.add.audio('powerup_main');
        sfx_button_swing = game.add.audio('button_swing');
    }    
    
    //
    if(game.device.localStorage)
    {        
        var saveData = localStorage.getItem('fistsoffrenzysavegame');
        if(saveData) playerData = JSON.parse(saveData);
    }  

    //   
    game.state.start('start_menu_state');
}

//
function goFullScreen()
{/*
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.startFullScreen(false);    
*/}

//
function loadAssets()
{


    var lang = SG.lang; //SG_Hooks.getLanguage(['en', 'ru']);
    game.load.json('strings', 'text/' + lang + '.json');



    for(var i = 1; i <= 5; i++)
    {
        var sname = 'bg_level_' + i.toString();
        game.load.image(sname, 'assets/' + sname + '.png');
    } 

    game.load.image('bg_gui', 'assets/bg_gui.png');
    game.load.image('tutorial_dark_layer', 'assets/tutorial_dark_layer.png');

    game.load.atlas('atlas_play', 'assets/atlas_play.png', 'assets/atlas_play.json');
    game.load.atlas('atlas_gui', 'assets/atlas_gui.png', 'assets/atlas_gui.json');

    if(game.device.webAudio)
    {
        game.load.audio('music', ['assets/sfx/music.mp3', 'assets/sfx/music.ogg']);

        game.load.audio('button_pressed', ['assets/sfx/button_pressed.mp3', 'assets/sfx/button_pressed.ogg']);        
        game.load.audio('punched1', ['assets/sfx/e_punched1.mp3', 'assets/sfx/e_punched1.ogg']);
        game.load.audio('punched2', ['assets/sfx/e_punched2.mp3', 'assets/sfx/e_punched2.ogg']);
        game.load.audio('punched3', ['assets/sfx/e_punched3.mp3', 'assets/sfx/e_punched3.ogg']);
        game.load.audio('punched4', ['assets/sfx/e_punched_4.mp3', 'assets/sfx/e_punched_4.ogg']);        
        game.load.audio('pain_echo', ['assets/sfx/pain_echo.mp3', 'assets/sfx/pain_echo.ogg']);       
        game.load.audio('powerup_main', ['assets/sfx/powerup_main.mp3', 'assets/sfx/powerup_main.ogg']);
        game.load.audio('switch_anything', ['assets/sfx/switch_anything.mp3', 'assets/sfx/switch_anything.ogg']);
        game.load.audio('button_swing', ['assets/sfx/button_swing.mp3', 'assets/sfx/button_swing.ogg']);
    }
}