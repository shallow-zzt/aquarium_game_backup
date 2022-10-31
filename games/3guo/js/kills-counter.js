//Kills Counter
//
var spriteNumbers = null;
var nStep = 0;
var difference = 10;

//
function CreateKillsCounter()
{
    spriteNumbers = new Array(3);
    var x = game.world.centerX + 100;

    for(var i = 0; i < 3; i++)
    {
        spriteNumbers[i] = game.add.sprite(x, game.world.centerY - 320, 'atlas_play', '0');
        spriteNumbers[i].visible = false;
        x += 48;
    }

    //
    nStep = 0;
    difference = 10;

    //
    printKillsCount(0);
}

//
function printKillsCount(n)
{    
    var str = n.toString();

    if(str.length > 3) return;

    for(var i = 0; i < str.length; ++i)
    {
        spriteNumbers[i].frameName = str[i];
        spriteNumbers[i].visible = true;
    }
}

//
function counterKillsUp()
{
    printKillsCount(++currentScore);

    if(timeEventStep.delay > 300)
    {
        if((currentScore - prevCurrentScore) === difference)
        {
            prevCurrentScore = currentScore;
            timeEventStep.delay -= 25;
            difference = 10 + 5 * ++nStep;            
        }
    }
}