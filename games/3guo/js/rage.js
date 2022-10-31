//Rage
//
var rageBar = null;
var rageBarW = null;

//
function CreateRageBar()
{
    game.add.sprite(game.world.centerX, 10, 'atlas_play', 'rage_sheell').anchor.setTo(0.5, 0.0);
    rageBar = game.add.sprite(56, 18, 'atlas_play', 'rage_fill');
    rageBar.scale.x = 0.0;

    rageBarW = game.add.sprite(rageBar.x, rageBar.y, 'atlas_play', 'rage_fill_w');
    rageBarW.scale.x = 0.0;
    rageBarW.visible = false;
}

//
function addRage()
{
    rageBar.scale.x += 0.04;
    if(rageBar.scale.x >= 1.0)
    {
        rageBar.scale.x = 1.0;
        spellSuperPowers();
    }
    else fadeRageBar();
}

//
function updateRage()
{
    if(!isSpellingSuperPower && rageBar.scale.x > 0.0) rageBarW.scale.x = rageBar.scale.x -= 0.00005 * game.time.elapsed;
}

//
function disappearRageWhite()
{
    rageBarW.visible = false;
    rageBar.visible = true;
}

//
function fadeRageBar()
{
    rageBarW.scale.x = rageBar.scale.x;
    rageBarW.visible = true;
    rageBar.visible = false;
    game.time.events.add(80, disappearRageWhite, this);
}