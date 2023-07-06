var game = new Phaser.Game(800,600,Phaser.AUTO,'my-game',{
    preload: preload,
    create: create,
    update: update
});

var hello1;
var hello2;
var hello3;
var spacebar;
var spinSound;
var scoretext;
var matchText;
var highScoreText;
var realHighScoreText
var score=100;
var highscore=0;
var match2Sound,match3Sound;
function preload(){
  // game.load.spreadsheet(whatvar,whatfile, width then height)
  game.load.spritesheet('hello','assets/hello-sprite.png',64,64)

  game.load.audio('spin','assets/spinner.mp3');
  game.load.audio('coin','assets/coin.wav'); //two matches
  game.load.audio('pu','assets/power-up.wav');//3 matches
}

function create(){
  game.stage.backgroundColor='#6699ff';
  // game.add.sprite x,y,image
  hello1=game.add.sprite(game.world.centerX,game.world.centerY,'hello');
  hello1.anchor.set(.5,.5);
  hello2=game.add.sprite(game.world.centerX+100,game.world.centerY,'hello');
  hello2.anchor.set(.5,.5);
  hello3=game.add.sprite(game.world.centerX-100,game.world.centerY,'hello');
  hello3.anchor.set(.5,.5);

  scoretext=game.add.text(game.world.centerX-100,game.world.centerY+80,
                          'Use the spacebar to spin',
                          {font:'Arial',
                          fontSize:'20px',
                          fontStyle:'bold',
                          fill:'#ffffff'});
  highScoreText=game.add.text(game.world.centerX-300,game.world.centerY+80,
                          'highscore',
                          {font:'Arial',
                          fontSize:'20px',
                          fontStyle:'bold',
                          fill:'#ffffff'});
  realHighScoreText=game.add.text(game.world.centerX-270,game.world.centerY+110,
                          '',
                          {font:'Arial',
                          fontSize:'20px',
                          fontStyle:'bold',
                          fill:'#ffffff'});
matchText = game.add.text(game.world.centerX+50, game.world.centerY + 80,'',{font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
matchText.setShadow(1, 1, '#000000', 2);
highScoreText.setShadow(1, 1, '#000000', 2);
realHighScoreText.setShadow(1, 1, '#000000', 2);
                          
  scoretext.setShadow(1,1,'#000000',2);
  spinSound=game.add.audio('spin',.3);
  match2Sound=game.add.audio('coin',.3);
  match3Sound=game.add.audio('pu',.3);
  spinSound.loop=true;
  
  spacebar=game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)

}

function update() {
    if(score>=0){
          if(spacebar.justDown){
            spinSound.play()
            matchText.text=''
          }
          else if(spacebar.isDown){
            if(score>=1)
            hello1.frame=Math.floor(Math.random()*6);
            hello2.frame=Math.floor(Math.random()*6);
            hello3.frame=Math.floor(Math.random()*6);
          }
          else if(spacebar.justUp){
            spinSound.stop();
            checkMatch();
            highScore();
          }
    }
    else{
        matchText.text='Your broke stop playing'
        spinSound.stop();
        game.stage.backgroundColor='#d5fb04';
    }
}
function checkMatch(){
  if(hello1.frame==hello2.frame && hello2.frame==hello3.frame)
    {score=score+100;
    match3Sound.play();
    matchText.fill='#0000ff';
    matchText.text='Match Three +100';
    game.stage.backgroundColor='#16e933';
    }            
  else if(hello1.frame==hello2.frame || hello2.frame==hello3.frame){ 
    score=score+20;
    match2Sound.play();
    matchText.fill='#0000ff';
    matchText.text='Match Two +20';
    game.stage.backgroundColor='#3c0df2';
  }
  else{
    score=score-20;
    matchText.fill='#0000ff';
    matchText.text='None Matched -20';
    game.stage.backgroundColor='#f00f0f';
  }
  scoretext.text='$'+score;
}
function highScore(){
  if (score>highscore){
    highscore=score;
    realHighScoreText.text='$'+highscore;
    game.stage.backgroundColor='#c91089';
  }
  else{
    realHighScoreText.text="$"+highscore;
  }
}
