//Play State
//
var PlayState = {
    create: createPlay,
    update: updatePlay
};

var hero = null;
var currentScore = 0;
var prevCurrentScore = 0;
var tapStartPoint = { x: 0, y: 0 };
var isSwipe = false;
var isSpellingSuperPower = false;

var neighborLeft = null;
var neighborTop = null;
var neighborRight = null;
var neighborBottom = null;

var centerPoint = null;

var level_n = 1;

//
function createPlay()
{
    prevGameState = 'play_state';

    //world and camera
    game.world.setBounds(0, 0, 654, 980);
    game.camera.x = 10;
    game.camera.y = 10;
    centerPoint = new Phaser.Point(game.world.centerX, game.world.centerY);

    //bg    
    game.add.sprite(game.world.centerX, game.world.centerY, 'bg_level_' + level_n).anchor.set(0.5);      

    //
    createIslets(level_n);

    //
    if(isDoneTutorial) CreateKillsCounter();
    else game.add.sprite(game.world.centerX, game.world.centerY, 'tutorial_dark_layer').anchor.set(0.5);  

    //enemies
    CreateEnemies(10);

    //hero    
    hero = CreateHero(playerData.currentHeroIdx);
    createPunchParticles();

    //
    CreateRageBar();

    //controls
    if(game.device.desktop)
    {
        var cursors = game.input.keyboard.createCursorKeys();
        cursors.left.onDown.add(punchLeftDesktop);
        cursors.right.onDown.add(punchRightDesktop);
        cursors.up.onDown.add(punchUpDesktop);
        cursors.down.onDown.add(punchDownDesktop);
    }
    else
    {
        game.input.onDown.add(onDownEventPlay, this);
        game.input.onUp.add(onUpEventPlay, this);
    }

    //
    currentScore = 0;
    prevCurrentScore = 0;    
    isSwipe = false;
    isSpellingSuperPower = false;

    neighborLeft = null;
    neighborTop = null;
    neighborRight = null;
    neighborBottom = null;

    //
    checkTutorial();    
}

//
function updatePlay()
{
    if(isSwipe) swipe();
    updateRage();
}

//
function swipe()
{
    var distSwipeX = game.input.activePointer.x - tapStartPoint.x;
    var distSwipeY = game.input.activePointer.y - tapStartPoint.y;
    var absDistSwipeX = Math.abs(distSwipeX);
    var absDistSwipeY = Math.abs(distSwipeY);
    
    if(Math.max(absDistSwipeX, absDistSwipeY) > 60)
    {       
        if(absDistSwipeX > absDistSwipeY)
        {
            if(distSwipeX > 0) punchRight();           
            else punchLeft();                       
        }
        else
        {
            if(distSwipeY > 0) punchDown();          
            else punchUp();           
        }

        isSwipe = false;
    }
}

//
function onDownEventPlay(event)
{
    if(!isSpellingSuperPower)
    {
        isSwipe = true;
        tapStartPoint.x = game.input.activePointer.x;
        tapStartPoint.y = game.input.activePointer.y;
    }
}

//
function onUpEventPlay(event)
{
    isSwipe = false;   
}

//
function punchLeft()
{
    hero.animations.play('punch_left');
    firePunchEffect(Math.PI);
    if(neighborLeft)
    {        
        punchToEnemy(neighborLeft);
        neighborLeft = null;
        addRage();
        cameraShake(-10, 0);
    }
}

function punchUp()
{
    hero.animations.play('punch_up');
    firePunchEffect(Math.PI * -0.5);
    if(neighborTop)
    {        
        punchToEnemy(neighborTop);
        neighborTop = null;
        addRage();
        cameraShake(0, -10);
    }
}

function punchRight()
{
    hero.animations.play('punch_right');
    firePunchEffect(0);
    if(neighborRight)
    {        
        punchToEnemy(neighborRight);
        neighborRight = null;
        addRage();
        cameraShake(10, 0);
    }
}

function punchDown()
{
    hero.animations.play('punch_down');
    firePunchEffect(Math.PI * 0.5);
    if(neighborBottom)
    {        
        punchToEnemy(neighborBottom);
        neighborBottom = null;
        addRage();
        cameraShake(0, 10);
    }
}

//
function punchLeftDesktop()
{
    if(!isSpellingSuperPower) punchLeft();
}

function punchUpDesktop()
{
    if(!isSpellingSuperPower) punchUp();
}

function punchRightDesktop()
{
    if(!isSpellingSuperPower) punchRight();
}

function punchDownDesktop()
{
    if(!isSpellingSuperPower) punchDown();
}

//camera shake
function cameraShake(dx, dy)
{
    game.camera.x += dx;
    game.camera.y += dy;
    game.add.tween(game.camera).to({ x: 10, y: 10 }, 200, Phaser.Easing.Bounce.Out, true) //Bounce.Out Linear.None,
}

//islets
function createIslets(level_n)
{
    var group = game.add.group();

    group.create(100, 310, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(168, 340, 'atlas_play', 'islet_b_' + level_n).anchor.setTo(0.5);
    group.create(150, 160, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(560, 670, 'atlas_play', 'islet_b_' + level_n).anchor.setTo(0.5);
    group.create(588, 359, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(460, 370, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(500, 720, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(480, 760, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(490, 880, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);
    group.create(90, 740, 'atlas_play', 'islet_b_' + level_n).anchor.setTo(0.5);
    group.create(160, 820, 'atlas_play', 'islet_b_' + level_n).anchor.setTo(0.5);
    group.create(150, 650, 'atlas_play', 'islet_l_' + level_n).anchor.setTo(0.5);

    game.add.tween(group).to({ x: 0.0, y: 8.0 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true)
}