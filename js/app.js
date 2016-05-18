// variables
//========================================
var playerDead = FALSE;
var bossDead = FALSE;
var playerVerbs = [
    {"class":"Bard", "special":"buff", "attackVerb":"strikes"},
    {"class":"Gunslinger", "special":"", "attackVerb":"slings"},
    {"class":"Paladin", "special":"", "attackVerb":"slashes"},
    {"class":"Berserker", "special":"", "attackVerb":"bashes"},
    {"class":"Wizard", "special":"", "attackVerb":"hits"},
    {"class":"Thief", "special":"", "attackVerb":"stabs"},
    {"class":"Healer", "special":"heal", "attackVerb":"whacks"},
    {"class":"Ranger", "special":"", "attackVerb":"jabs"},
    {"class":"Explorer", "special":"", "attackVerb":"pokes"},
    {"class":"Monk", "special":"", "attackVerb":"delivers a flurry of strikes"},
    {"class":"Knight", "special":"", "attackVerb":"cuts"},
    {"class":"Druid", "special":"", "attackVerb":"hammers"},
    {"class":"Alchemist", "special":"potion", "attackVerb":"bashes"},
    {"class":"Warrior", "special":"", "attackVerb":"deals a massive blow"}
];
var playerOption = '';

// 5 bosses, one for each level
var bosses = [{
    {"bossName":"Bob", "special":"", "attackVerb":"tweets a solid blow", "bossHp":5000},
    {"bossName":"Bob2", "special":"", "attackVerb":"facebooks", "bossHp":10000},
    {"bossName":"FooBob", "special":"", "attackVerb":"strikes", "bossHp":20000},
    {"bossName":"BarBob", "special":"", "attackVerb":"strikes", "bossHp":30000},
    {"bossName":"BazBob", "special":"", "attackVerb":"googles", "bossHp":50000}
}];

// 4 characters/sites
var characters = [{

}];

if (playerDead !==TRUE)
window.addEventListener( "keypress", playerTurn, false )
function playerTurn(e){

    //====================
    //	THE S KEY  -- special skill
    //====================
    if (e.keyCode == 83) {
        playerSpecial(player, boss);
    }

    //====================
    //	THE A KEY -- Attack,
    // damage dealt to boss based
    // on random number and player class
    //====================
    if (e.keyCode == 65) {
        playerAttack(player, boss);
    }

    //====================
    //	THE D KEY  -- Defend
    // damage dealt from
    // boss is halved
    //====================
    if (e.keyCode == 68) {
        playerDefend(player, boss);
    }

}


// Attack function -- 'A' key invokes
//========================================

var playerAttack = function(player, boss){
boss.currentHP-=player.attack();
}

// Special function  -- S key invokes
//========================================
var playerSpecial = function(player, boss){
        switch (player.class){
            case "Bard":
                player.special(playerCharacters,player.INT);
                break;
            case "Gunslinger":
                boss.currentHP-=player.special(player.INT);
                break;
            case "Paladin":
                boss.currentHP-=player.special(player.INT,player.STR)
                break;
            case "Berserker":
                player.special(player.STR);
                break;
            case "Wizard":
                return function(INT){
                    boss.currentHP-=player.special(player.INT);
                break;
                    
            case "Thief":
                    boss.currentHP-=player.special(player.INT,player.STR);
                break;
                    
            case "Healer":
                    player.special(playerCharacters,player.INT);
                break;
            case "Ranger":                    
                    boss.currentHP-=player.special(player.INT);
                break;
            case "Explorer":                    
                    player.special(player.INT);
                break;
            case "Monk":
                    boss.currentHP-=player.special(player.INT,player.STR);
                break;
            case "Sorcerer":
                    boss.currentHP-=player.special(player.INT);
                break;
            case "Knight":
                    player.special(player.INT,player.STR);
                break;
            case "Druid":
                    player.special(playerCharacters,player.INT);
                break;
            case "Alchemist":
                    player.special(player.INT);
                break;
            case "Warrior":
                    boss.currentHP-=player.special(player.STR);
                break;}},
}




// defend function 'D' key invokes
//========================================
var playerDefend = function(player, boss){

}


// boss hp less than or equal to zero
//===================================================
function bossIsDead(){

};
// player hp less than or equal to zero
//===================================================
function playerIsDead(){

};

