//Hero
//
var punch_fx = null;
var pucnhFxEmitter = null;
var superPowerSprites = null;
var superPowerInitiateFx = null;
var spellVelocity = null;

//
var CreateHero = function(nameIdx)
{
    //get name of hero from idx
    var name = getHeroNameByIndex(nameIdx);

    //hit effect
    createPunchEffects(4);
    
    //
    var hitAnimFrameRate = 4;

    var hero = game.add.sprite(game.world.centerX, game.world.centerY - 12, 'atlas_play');
    hero.anchor.set(0.5);
    if(nameIdx === 5) hero.x -= 9;    
    game.physics.enable(hero, Phaser.Physics.ARCADE);

    //idle
    var frameNames = Phaser.Animation.generateFrameNames(name + '_idle_', 1, 3, '', 1);
    frameNames.push(name + '_idle_2');
    hero.animations.add('idle', frameNames, 8, true);

    //punch right
    frameNames = [name + '_punch_right'];
    hero.animations.add('punch_right', frameNames, hitAnimFrameRate).onComplete.add(endHeroAttackAnimation);

    //punch left
    frameNames = [name + '_punch_left'];
    hero.animations.add('punch_left', frameNames, hitAnimFrameRate).onComplete.add(endHeroAttackAnimation);

    //punch down
    frameNames = [name + '_punch_down'];
    hero.animations.add('punch_down', frameNames, hitAnimFrameRate).onComplete.add(endHeroAttackAnimation);

    //punch up
    frameNames = [name + '_punch_up'];
    hero.animations.add('punch_up', frameNames, hitAnimFrameRate).onComplete.add(endHeroAttackAnimation);

    //extreme
    frameNames = [name + '_extreme'];
    hero.animations.add('extreme', frameNames, hitAnimFrameRate);

    //dead
    frameNames = [name + '_dead'];
    hero.animations.add('dead', frameNames, hitAnimFrameRate);

    //
    hero.animations.play('idle');

    //
    createSuperPower(name);

    return hero;
};

//
function endHeroAttackAnimation(sprite, animation)
{
    sprite.animations.play('idle');    
}

//Punch FX
function createPunchEffects(n)
{
    punch_fx = game.add.group();

    punch_fx.createMultiple(n, 'atlas_play');
    punch_fx.setAll('anchor.x', -0.4);
    punch_fx.setAll('anchor.y', 0.5);
    
    for(var i = 0; i < n; i++)
    {        
        punch_fx.getAt(i).animations.add('punch_fx', ['punch_fx_1', 'punch_fx_2', 'punch_fx_3'], 20).onComplete.add(punchFxEnd);
    }    
}

//
function punchFxEnd(sprite, animation)
{
    sprite.kill();
}

//
function firePunchEffect(r)
{
    var fx = punch_fx.getFirstExists(false);
    if(fx)
    {
        fx.reset(game.world.centerX, game.world.centerY);
        fx.rotation = r;
        fx.animations.play('punch_fx');
    }
    if(sfx_button_swing) sfx_button_swing.play();
}

//punch particles
function createPunchParticles()
{
    pucnhFxEmitter = game.add.emitter(0, 0, 15);

    pucnhFxEmitter.makeParticles('atlas_play', 'particle1');
    //pucnhFxEmitter.setAlpha(1.0, 0.2, 800);
    pucnhFxEmitter.setSize(40, 40);
    //pucnhFxEmitter.setRotation(0, 0);
    pucnhFxEmitter.setXSpeed(-140, 140);
    pucnhFxEmitter.setYSpeed(-140, 140);
    pucnhFxEmitter.setScale(1.1, 0.2, 1.1, 0.2, 800);    
}

function firePunchParticles(x, y)
{
    pucnhFxEmitter.x = x;
    pucnhFxEmitter.y = y;
    pucnhFxEmitter.start(true, 400, null, 3);
}

//Super power
//
function createSuperPower(name)
{
    superPowerSprites = game.add.group();
    superPowerSprites.enableBody = true;
    superPowerSprites.physicsBodyType = Phaser.Physics.ARCADE;

    superPowerSprites.createMultiple(16, 'atlas_play', name.toString() + '_particle');
    superPowerSprites.setAll('anchor.x', 0.5);
    superPowerSprites.setAll('anchor.y', 0.5);
    superPowerSprites.setAll('body.allowGravity', false);    
    superPowerSprites.setAll('checkWorldBounds', true);
    superPowerSprites.setAll('outOfBoundsKill', true);    

    //
    superPowerInitiateFx = game.add.sprite(game.world.centerX, game.world.centerY - 12, 'atlas_play');
    superPowerInitiateFx.anchor.setTo(0.5);
    superPowerInitiateFx.animations.add('superpower', ['superpower_1', 'superpower_2', 'superpower_3', 'superpower_4'], 12).onComplete.add(function() { superPowerInitiateFx.visible = false; });
    superPowerInitiateFx.visible = false;

    //
    spellVelocity = new Array(8);    
    for(var i = 0; i < 8; i++)
    {
        spellVelocity[i] = new Phaser.Point(-1.0, 0.0);
        spellVelocity[i].rotate(0, 0, i * -45, true);        
        spellVelocity[i].normalize();
        spellVelocity[i].x *= 1200;
        spellVelocity[i].y *= 1200;
    }
}

//
function spellSuperPower()
{
    //
    superPowerInitiateFx.visible = true;
    superPowerInitiateFx.animations.play('superpower');
    
    //
    for(var i = 0; i < 8; ++i)
    {
        var e = superPowerSprites.getFirstExists(false);
        if(e)
        {
            e.reset(game.world.centerX, game.world.centerY);                       
            e.angle = i * -45;
            e.body.velocity.copyFrom(spellVelocity[i]);
            if(i === 7) e.update = collideSpell;
        }       
    }

    //
    fadeRageBar();

    //
    cameraShake(game.rnd.integerInRange(0, 1) === 1 ? 10 : -10, game.rnd.integerInRange(0, 1) === 1 ? 5 : -5);
}

//
function spellSuperPowers()
{
    isSwipe = false;
    isSpellingSuperPower = true;

    neighborLeft = null;
    neighborTop = null;
    neighborRight = null;
    neighborBottom = null;

    hero.animations.play('extreme');

    spellSuperPower();

    game.time.events.repeat(500, 2, spellSuperPower);
    game.time.events.add(1500, endSpellSuperPowers);

    if(sfx_powerup_main) sfx_powerup_main.play();
}

//
function endSpellSuperPowers()
{    
    hero.animations.play('idle');
    isSpellingSuperPower = false;
    rageBar.scale.x = 0.0;
}

//
function collideSpell()
{
    if(this.exists)
    {
        var radius = centerPoint.distance(this, false);
        checkCollideWithSpell(radius);
    }
    else this.update = emptyFunc;
}

//
function punchToHero(path)
{
    var screen_white = game.add.sprite(game.world.centerX - 10, game.world.centerY - 10, 'atlas_play', 'screen_white');
    screen_white.anchor.setTo(0.5, 0.5);
    screen_white.scale.setTo(10.1, 10.1);
    screen_white.fixedToCamera = true;
    game.add.tween(screen_white).to({ alpha: 0.0 }, 500, Phaser.Easing.Linear.None, true);

    hero.animations.play('dead');   
    hero.body.angularVelocity = game.rnd.integerInRange(0, 1) === 1 ? 300 : -300;
    hero.body.velocity = getVelocityByPunchToHero(path);
    hero.alive = false;
    isSwipe = false;
    isSpellingSuperPower = true;

    game.time.events.add(1200, function() { game.state.start('game_over_state'); });

    if(sfx_pain_echo) sfx_pain_echo.play();
}

//
function getHeroNameByIndex(idx)
{
    switch(idx)
    {
        case 0: return 'pa';
        case 1: return 'newbie';
        case 2: return 'robo';
        case 3: return 'sg';
        case 4: return 'vampire';
        case 5: return 'knight';
        case 6: return 'panda';
        default: return 'pa';
    }
}