//creating fruit, fruit1, fruit2, fruit3, fruit4
var fruit, fruit1, fruit2, fruit3, fruit4;
 
//creating gameOver, gameOverimg and gameOversound;
var gameOver, gameOverImg, gameOversound;

//creating fruitGroup and enemyGroup
var fruitGroup, enemyGroup;

//creating monster and monsterImg
var monster, monsterImg; 

//creating variables sword, swordImg and swordsound
var sword, swordImg, swordSound;

//creating variable score
var score = 0;

//game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
//loading Images
swordImg = loadImage("sword.png");
monsterImg = loadAnimation("alien1.png","alien2.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
gameOverImg = loadImage("gameover.png");
  
swordSound = loadSound("knifeSwooshSound.mp3");
gameOversound = loadSound("gameover.mp3");
}

function setup(){
//creating canvas
createCanvas(600,600);
  
//creating sword
sword = createSprite(40,200,20,20);
sword.addImage(swordImg);
sword.scale = 0.7;

//set collider for sword
sword.setCollider("rectangle",0,0,40,40);
  
//creating fruit and enemy Groups
fruitGroup = createGroup();
enemyGroup = createGroup();
}

function draw(){
background("lightblue");
  
  if(gameState === PLAY){
  //move sword with mouse
  sword.y = World.mouseY;  
  sword.x = World.mouseX;  
    
  //call fruit and Enemy functions
  fruits();
  enemy();
        
  //Increase score if sword touching fruit
  if(fruitGroup.isTouching(sword)){
    swordSound.play();      
     fruitGroup.destroyEach();
     score = score +2;
  }
    
  else{
    
    if(enemyGroup.isTouching(sword)){
       gameState = END;
        
      
       //gameOver Sound
       gameOversound.play();
      
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityEach(0);
        enemyGroup.setVelocityEach(0);
     
//change animation of sword to gameover and reset its position
        sword.addImage(gameOverImg);
        sword.x = 200;
        sword.y = 200;
  }
  }
  }
  
//display score
text("score: "+ score,300,30);
  
drawSprites();
}

function fruits(){
  if(frameCount % 200 === 0){
     position = Math.round(random(1,2));
     fruit = createSprite(400,200,20,20);
     fruit.scale = 0.2;
     var r = Math.round(random(1,4));
     if(r == 1){
      fruit.addImage(fruit1);
     }else if(r == 2){
      fruit.addImage(fruit2);
     }else if(r == 3){
      fruit.addImage(fruit3);
     }else{
      fruit.addImage(fruit4);
     }
    
     fruit.y = Math.round(random(50,340));
     
     fruit.velocityX = -7;
     fruit.setLifetime = 100;
    
     fruitGroup.add(fruit);
    
     if(position == 1){
        fruit.x = 400;
        fruit.velocityX = -(7+(score/4));
     }
     else{
     if(position == 2){
        fruit.x = 0;
       
     //increase the velocity of the fruit after score4 or 10
     fruit.velocityX = (7+(score/4));
     }
     }
 }
}

function enemy(){
  if(frameCount % 200 === 0){
     monster = createSprite(400,200,20,20);
     monster.addAnimation("moving", monsterImg);
     monster.y = Math.round(random(100,300));
     monster.velocityX = -(8+(score/10));
     monster.setLifetime = 50;
    
     enemyGroup.add(monster);
     }
} 