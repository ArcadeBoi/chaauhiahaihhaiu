var trex, trex_running, trex_collided;


var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var bg

var score;

var gameOver,restart;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  bg = loadImage("title.png");
  
  

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {


  createCanvas(displayWidth,200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("collided",trex_collided);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,30);
 
  ground = createSprite(0,180,displayWidth,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup   = new Group();
  Group = new Group();
  
  score = 0;

   GameOver = createSprite(camera.position.x,100);
   Restart = createSprite(camera.position.x,140);
   GameOver. addImage("gameOver",gameOver);
   GameOver.scale = 0.5;
   Restart.addImage("restart",restart);
   Restart.scale = 0.5;

   GameOver.visible = false;
   Restart.visible = false;
}

function draw() {
  background(bg);
  fill ("lime");
  textSize(20)
  text("Score: "+ score, camera.position.x - 650,50);
  
  if(gameState === PLAY){
    trex.changeAnimation("running");
    camera .position.x = trex.x

    ground.velocityX = -(6 + 3*score/100);
    score = score + Math.round(getFrameRate()/60);

    if (ground.x < 0){
      ground.x = ground.width/4;
    }

    //jump when the space key is pressed
 if(touches.length>0 && keyDown("space") && trex.y > 160 ){
  trex.velocityY = -12 ;
  touches = [];
}
  
  trex.velocityY = trex.velocityY + 0.6

  spawnClouds();
  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
   }

  }
  else if(gameState === END){

    GameOver.visible = true;
    Restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided");
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }

  if(mousePressedOver(Restart)) {
    reset();
  }
    
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % camera.position.x === 0) {
    var cloud = createSprite(displayWidth,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 800;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % camera.position.x  === 0) {
    var obstacle = createSprite(displayWidth,165,10,40);
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 800;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

  function reset(){
  gameState = PLAY;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running");
  GameOver.visible=false;
  Restart.visible=false;
  score=0; 
}