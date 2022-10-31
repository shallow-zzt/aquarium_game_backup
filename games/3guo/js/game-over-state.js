//Game Over State
//
var GameOverState = {
    create: createGameOver    
};

//
var gameover = null;

var soundButton = null;
var backButton = null;
var playButton = null;
var heroHeadButton = null;

var textScore = null;
var textBest = null;

//
function createGameOver()
{
    if(prevGameState != 'game_over_state')
    {
        prevGameState = 'game_over_state';
        
        if(playerData.bestScore < currentScore) playerData.bestScore = currentScore;
        playerData.totalScore += currentScore;
        checkUnlockHeroes(currentScore);
        if(game.device.localStorage) localStorage.setItem('fistsoffrenzysavegame', JSON.stringify(playerData));

        SG_Hooks.gameOver(0, currentScore); 
    }
    //
    strings = game.cache.getJSON('strings');

    game.world.setBounds(0, 0, 634, 960);
    game.camera.x = 0;
    game.camera.y = 0;

    var bg = game.add.sprite(0, 0, 'bg_gui');

    gameover = game.add.sprite(game.world.centerX, 150 - game.world.height, 'atlas_gui', 'gameover');
    gameover.anchor.set(0.5);     

    //
    soundButton = createSoundButton();
    backButton = createBackButton(buttonBackClickGO);
    playButton = createPlayButton(buttonPlayClickGO);
    heroHeadButton = createHeroHeadButton(buttonHeroHeadClickGO);

    //
    textScore = createText(game.world.centerX, 400 - game.world.height, 32);
    textScore.text = strings.score + '\n' + currentScore.toString();

    textBest = createText(game.world.centerX, 600 - game.world.height, 32);
    textBest.text = strings.best + '\n' + playerData.bestScore.toString();

    //
    game.add.tween(gameover).to({ y: 150 }, 200, Phaser.Easing.Elastic.Out, true);    
    game.add.tween(textScore).to({ y: 400 }, 200, Phaser.Easing.Elastic.Out, true);
    game.add.tween(textBest).to({ y: 600 }, 200, Phaser.Easing.Elastic.Out, true);
    game.add.tween(textBest).to({ y: 600 }, 200, Phaser.Easing.Elastic.Out, true);   
}

//
function createSoundButton()
{
    var btn = game.add.button(574, 60 - game.world.height, 'atlas_gui', buttonSoundClick, this, 'btn_sound_on', 'btn_sound_on', 'btn_sound_on', 'btn_sound_on');
    if(game.sound.mute) btn.setFrames('btn_sound_off', 'btn_sound_off', 'btn_sound_off', 'btn_sound_off');
    btn.anchor.set(0.5);
    if(sfx_button_pressed) btn.setDownSound(sfx_button_pressed);
    game.add.tween(btn).to({ y: 60 }, 200, Phaser.Easing.Elastic.Out, true);
    return btn;
}

function buttonSoundClick(button)
{
    game.sound.mute = !game.sound.mute;
    if(game.sound.mute) button.setFrames('btn_sound_off', 'btn_sound_off', 'btn_sound_off', 'btn_sound_off');
    else button.setFrames('btn_sound_on', 'btn_sound_on', 'btn_sound_on', 'btn_sound_on');
}

//
function createText(x, y, fontSize)
{
    var text = game.add.text(x, y);
    text.anchor.set(0.5);
    text.align = 'center';
    var fontSizeScale = 1;
    if(text.fontSize !== 0 && text.fontSize !== 32) fontSizeScale = 32 / text.fontSize;
    text.fontSize = fontSize * fontSizeScale;
    text.fill = '#ffffff';
    text.stroke = '#000000';
    text.strokeThickness = 4;   
    text.scale.set(2.0);
    return text;
}

//
function createPlayButton(callBack)
{
    var btn = game.add.button(game.world.centerX, game.world.height + 100, 'atlas_gui', callBack, this, 'btn_play_normal', 'btn_play_normal', 'btn_play_pressed', 'btn_play_normal');
    btn.anchor.set(0.5);
    if(sfx_button_pressed) btn.setDownSound(sfx_button_pressed);
    game.add.tween(btn).to({ y: game.world.height - 100 }, 200, Phaser.Easing.Elastic.Out, true);
    return btn;
}

function buttonPlayClickGO()
{
    level_n = game.rnd.integerInRange(1, 5).toString();
    leaveGameOverState('play_state');
}

//
function createHeroHeadButton(callBack)
{
    var name = getHeroNameByIndex(playerData.currentHeroIdx);    

    name += '_head';

    var btn = game.add.button(game.world.centerX + 200, game.world.height + 100, 'atlas_gui', callBack, this, 'btn_forhead_normal', 'btn_forhead_normal', 'btn_forhead_pressed', 'btn_forhead_normal');
    btn.anchor.set(0.5);

    var head = game.add.sprite(0, 0, 'atlas_gui', name);
    head.anchor.set(0.5);

    btn.addChild(head);

    if(sfx_button_pressed) btn.setDownSound(sfx_button_pressed);

    if(playerData.unlockedNextHero)
    {        
        var exclamation = game.add.sprite(btn.width * -0.5, btn.height * -0.5, 'atlas_gui', 'exclamation');        
        btn.addChild(exclamation);
    }

    game.add.tween(btn).to({ y: game.world.height - 100 }, 200, Phaser.Easing.Elastic.Out, true);
    return btn;
}

function buttonHeroHeadClickGO()
{    
    leaveGameOverState('select_hero_state');
}


//
function createBackButton(callBack)
{    
    var btn = game.add.button(60, 60 - game.world.height, 'atlas_gui', callBack, this, 'btn_back', 'btn_back', 'btn_back', 'btn_back');
    btn.anchor.set(0.5);
    if(sfx_button_pressed) btn.setDownSound(sfx_button_pressed);
    game.add.tween(btn).to({ y: 60 }, 200, Phaser.Easing.Elastic.Out, true);
    return btn;
}

function buttonBackClickGO(button)
{    
    leaveGameOverState('start_menu_state');
}

//
function leaveGameOverState(stateName)
{
    game.add.tween(gameover).to({ y: 150 - game.world.height }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(textScore).to({ y: 400 - game.world.height }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(textBest).to({ y: 600 - game.world.height }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(textBest).to({ y: 600 - game.world.height }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(soundButton).to({ y: 60 - game.world.height }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(playButton).to({ y: game.world.height + 100 }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(backButton).to({ y: 60 - game.world.height }, 300, Phaser.Easing.Linear.None, true);
    game.add.tween(heroHeadButton).to({ y: game.world.height + 100 }, 300, Phaser.Easing.Linear.None, true).onComplete.add(function() { game.state.start(stateName); });
}