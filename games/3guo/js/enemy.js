//Enemy
//
var enemies = null;
var missSpawnCount = 0;
var speed = 1000;
var tileSize = 77;

var leftPath = null;
var upPath = null;
var rightPath = null;
var downPath = null;

var timeEventStep = null;

var enemiesCount = 0;

//
function CreateEnemies(n)
{
    enemiesCount = n;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    enemies.createMultiple(n, 'atlas_play');

    enemies.setAll('anchor.x', 0.5);
    enemies.setAll('anchor.y', 0.5);
    enemies.setAll('body.allowGravity', false);
    enemies.setAll('body.moves', false);
    enemies.setAll('pathIdx', 0);
    enemies.setAll('path', null);
    enemies.setAll('compareFunc', null);
    enemies.setAll('deadFrame', '');

    enemies.callAll('animations.add', 'animations', 'left', ['enemy_left_1', 'enemy_left_2', 'enemy_left_3', 'enemy_left_2'], 8, true);
    enemies.callAll('animations.add', 'animations', 'up', ['enemy_up_1', 'enemy_up_2', 'enemy_up_3', 'enemy_up_2'], 8, true);
    enemies.callAll('animations.add', 'animations', 'right', ['enemy_right_1', 'enemy_right_2', 'enemy_right_3', 'enemy_right_2'], 8, true);
    enemies.callAll('animations.add', 'animations', 'down', ['enemy_down_1', 'enemy_down_2', 'enemy_down_3', 'enemy_down_2'], 8, true);

    //
    missSpawnCount = 0;
    
    //path points
    leftPath = [88, 88 + tileSize, 88 + tileSize * 2, game.world.centerX];
    upPath = [game.world.centerY - 12 - tileSize * 3, game.world.centerY - 12 - tileSize * 2, game.world.centerY - 12 - tileSize, game.world.centerY - 12];
    rightPath = [game.world.width - 88, game.world.width - 88 - tileSize, game.world.width - 88 - tileSize * 2, game.world.centerX];
    downPath = [game.world.centerY - 12 + tileSize * 3, game.world.centerY - 12 + tileSize * 2, game.world.centerY - 12 + tileSize, game.world.centerY - 12];

    //
    if(isDoneTutorial) timeEventStep = game.time.events.loop(500, allEnemiesStep, this);
}

//
function spawnEnemy(i)
{
    var e = enemies.getFirstExists(false);    
    if(e)
    {
        var animationName = '';
        var vx = 0;
        var vy = 0;

        switch(i)
        {
            case 0:
                animationName = 'left';
                e.path = leftPath;
                e.reset(leftPath[0] - tileSize, game.world.centerY - 12);
                e.compareFunc = compareBig;
                e.deadFrame = 'enemy_left_dead';
                vx = speed;
                break;
            case 1:
                animationName = 'right';
                e.path = rightPath;
                e.reset(rightPath[0] + tileSize, game.world.centerY - 12);
                e.compareFunc = compareLittle;
                e.deadFrame = 'enemy_right_dead';
                vx = -speed;
                break;
            case 2:
                animationName = 'up';
                e.path = upPath;
                e.reset(game.world.centerX - 8, upPath[0] - tileSize);
                e.compareFunc = compareBig;
                e.deadFrame = 'enemy_up_dead';
                vy = speed;
                break;
            case 3:
                animationName = 'down';
                e.path = downPath;
                e.reset(game.world.centerX + 8, downPath[0] + tileSize);
                e.compareFunc = compareLittle;
                e.deadFrame = 'enemy_down_dead';
                vy = -speed;
                break;
        }

        e.pathIdx = -1;
        e.body.velocity.setTo(vx, vy);
        e.animations.play(animationName);
        e.angle = 0;
        e.alpha = 0.2;        
        game.add.tween(e).to({ alpha: 1.0 }, 150, Phaser.Easing.Linear.None, true);
    }
    return e;
}

//
function enemyStep(e)
{    
    e.body.moves = true;
    e.update = updateEnemy;
    if(++e.pathIdx === 2) becomeNeighbor(e);       
}

//
function allEnemiesStep()
{
    //try spawn enemy unit
    if(missSpawnCount < 2 && game.rnd.integerInRange(0, 100) > 93)
        ++missSpawnCount;
    else
    {
        missSpawnCount = 0;
        spawnEnemy(game.rnd.integerInRange(0, 3));
    }
    //move units
    enemies.forEachAlive(enemyStep, this);    
}

//
function updateEnemy()
{
    var rv = this.path[this.pathIdx];    
    if(this.body.velocity.y === 0)
    {
        if(this.compareFunc(this.x, rv))
        {
            this.x = rv;
            onPathPoint(this);            
        }
    }
    else
    {
        if(this.compareFunc(this.y, rv))
        {
            this.y = rv;
            onPathPoint(this);
        }
    }
}

//
function compareLittle(a, b)
{
    return a < b;
}

function compareBig(a, b)
{
    return a > b;
}

//
function onPathPoint(e)
{   
    e.update = emptyFunc;    
    e.body.moves = false;
    if(e.pathIdx === 3)
    {        
        game.time.events.remove(timeEventStep);        
        punchToHero(e.path[0]);
    }
}

//
function becomeNeighbor(e)
{
    switch(e.path[0])
    {
        case leftPath[0]: neighborLeft = e; break;
        case upPath[0]: neighborTop = e; break;
        case rightPath[0]: neighborRight = e; break;
        case downPath[0]: neighborBottom = e; break;
    }
}

//
function punchToEnemy(e)
{    
    var angle = game.rnd.integerInRange(-30, 30);

    e.animations.stop();
    e.frameName = e.deadFrame;

    e.body.velocity = Phaser.Point.negative(e.body.velocity);
    e.body.velocity.normalize();
    e.body.velocity.rotate(0, 0, angle, true);
    e.body.velocity.x *= 1200;
    e.body.velocity.y *= 1200;    
    e.body.angularVelocity = angle > 0 ? 320 : -320;
    e.body.moves = true;    

    e.update = timeToDeadEnemy;
    e.alive = false;

    if(!isSpellingSuperPower) enemies.bringToTop(e);

    //
    if(isDoneTutorial) counterKillsUp();
    else nextStepTutorial();

    //
    firePunchParticles(e.x, e.y);
    if(sfx_punched) game.rnd.pick(sfx_punched).play();//sfx_punched[game.rnd.integerInRange(0, 3)].play();
}

function timeToDeadEnemy()
{
    if(!this.inWorld)
    {
        this.body.angularVelocity = 0;        
        this.body.moves = false;
        this.update = emptyFunc;
        this.kill();        
    }
}

//
function checkCollideWithSpell(radius)
{
    for(var i = 0; i < enemiesCount; ++i)
    {
        var e = enemies.getAt(i);
        if(e.alive)
        {
            var d = centerPoint.distance(e, false);
            if(radius > d) punchToEnemy(e);
        }        
    }    
}

//
function getVelocityByPunchToHero(path)
{
    var vel = new Phaser.Point(0.0, 0.0);

    switch(path)
    {
        case leftPath[0]: vel.x = 1.0; break;
        case upPath[0]: vel.y = 1.0; break;
        case rightPath[0]: vel.x = -1.0; break;
        case downPath[0]: vel.y = -1.0; break;
    }

    cameraShake(vel.x * 20, vel.y * 20);

    var angle = game.rnd.integerInRange(-30, 30);
    vel.rotate(0, 0, angle, true);
    vel.x *= 700;
    vel.y *= 700;

    return vel;
}