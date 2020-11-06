var PLAY = 1;
var END = 0;
var gameState=1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime,ground,groundImage,invisibleGround;

function preload(){
  
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground2.png")
 
}



function setup() {
  createCanvas(600, 200);
  monkey=createSprite(80,150,20,20);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width    /2;

  invisibleGround = createSprite(200,185,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  survivalTime = 0;
}


function draw() {
  background(220);
  text("Survival Time: "+ survivalTime, 450,50);
  if(gameState===PLAY){
     ground.velocityX = -(4 + survivalTime/100);
     survivalTime = survivalTime + Math.round(getFrameRate()/60);
     if (ground.x < 0){
      ground.x = ground.width/2;
     }
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
     }
     monkey.velocityY = monkey.velocityY + 0.8;
    spawnObstacles();
    spawnBanana();
   }
   else if(gameState===END){
     ground.velocityX = 0;
     trex.velocityY = 0;
   }

  monkey.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 150 === 0){
    obstacle = createSprite(600,165,10,40);
    obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(4 + survivalTime/100);
   obstacle.scale = 0.13;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if (frameCount % 80 === 0){
    banana = createSprite(600,65,10,40);
    banana.addImage(bananaImage);
    banana.velocityX = -(4 + survivalTime/100);
    banana.scale = 0.13;
    banana.lifetime = 300;
    bananaGroup.add(banana);
  }
}