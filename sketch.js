var ninja, ninjaImg,invisibleRoad;
var backGround,backGroundImg,backgroundImg2;
var play,playImg,restart,restartImg;
var ninjaStarImg,ninjaStarG,ninjaStar;
var shootButton, shootButtonImg;
var enemy1G,enemy2G,enemy3G,enemy1Img,enemy2Img,enemy3Img;
var START = 2,PLAY = 1,END = 0;
var gameState = START;
var score, ninja_star_count;
var collectStarImg,collect_ninja_starG;
var gameOverSound,checkPointSound,jumpSound,pickUpSound,swooshSound;

function preload(){
    ninjaImg=loadAnimation("Run__001.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png");
    backGroundImg=loadImage("background.jpg");
    ninjaStarImg=loadImage("ninja_star.png");
    shootButtonImg=loadImage("shoot_button.png");
    enemy1Img = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png",)
    enemy2Img = loadAnimation("Walk (11).png","Walk (12).png","Walk (13).png","Walk (14).png","Walk (15).png","Walk (16).png","Walk (17).png","Walk (18).png","Walk (19).png","Walk (20).png",)
    enemy3Img = loadAnimation("RunShoot (1).png","RunShoot (2).png","RunShoot (3).png","RunShoot (4).png","RunShoot (5).png","RunShoot (6).png","RunShoot (7).png","RunShoot (8).png",)
    backGroundImg2 = loadImage("gameover.jpg");
    playImg=loadImage("button-removebg-preview.png");
    restartImg=loadImage("R-removebg-preview.png");
    collectStarImg=loadImage("collect_ninja_star.png");
    gameOverSound= loadSound("gameover.wav");
    jumpSound = loadSound("jump.mp3");
    pickUpSound = loadSound("pickup.mp3");
    swooshSound = loadSound("sword.wav");
}

function setup() {
    createCanvas(600,300);

    backGround=createSprite(300,150,600,300);
    backGround.addImage(backGroundImg);
    backGround.scale=0.2;
    //backGround.velocityX = -4;

    ninja=createSprite(50,250,20,20);
    ninja.addAnimation("running",ninjaImg);
    ninja.scale=0.2;


    score=0;
    ninja_star_count=0;
    
    invisibleRoad=createSprite(50,300,60,3);

    shootButton=createSprite(550,150,10,10);
    shootButton.addImage(shootButtonImg);
    shootButton.scale=0.3;   
    
    play=createSprite(300,150,10,10);
    play.addImage(playImg);
    play.scale=0.2;
    play.visible= false;    

    restart=createSprite(300,200,10,10);
    restart.addImage(restartImg);
    restart.scale=0.2;
    restart.visible= false;   
    

    enemy1G= new Group();
    enemy2G= new Group();
    enemy3G= new Group();
    ninjaStarG= new Group();
    collect_ninja_starG = new Group();
}

function draw() {
    background(180);
    
    //ninja.debug=true;

   drawSprites();
    
    

    if(gameState===START){
        play.visible=true;
        ninja.visible=false;
        shootButton.visible=false;
        if(mousePressedOver(play)){
            gameState=PLAY;
        }
    }

    if(gameState===PLAY){
        
       
    textSize(20);
    fill(255);
    text("Score: "+ score,275,50);
    text("Ninja Stars: "+ ninja_star_count,250,75);

    

        play.visible=false;
        ninja.visible=true;
        shootButton.visible=true;

        backGround.velocityX = -(4+score/10);

        spawnStar()
        if(collect_ninja_starG.isTouching(ninja)){
            ninja_star_count+=1
            collect_ninja_starG.destroyEach();
            pickUpSound.play();
        }


    if(backGround.x<-50){
        backGround.x=300;
    }
    if(keyDown("Space") && ninja.y>=250) {
        ninja.velocityY = -19;
        jumpSound.play()
            }
    ninja.velocityY = ninja.velocityY + 0.8
    
    ninja.collide(invisibleRoad);
    invisibleRoad.visible= false;

    if(mousePressedOver(shootButton) && ninja_star_count>0){
        createStar();
        ninja_star_count-=1;
    }
    
    var select_enemy = Math.round(random(1,3));

    if (World.frameCount % 60 == 0) {
        if (select_enemy == 1) {
          createEnemy();
        }
        else if(select_enemy==2){
            createEnemy2();
        }
        else  if(select_enemy==3){
            createEnemy3();
        }
    }

    if(ninjaStarG.isTouching(enemy1G)){
        enemy1G.destroyEach(0);
        ninjaStarG.destroyEach();
        score+=1;
        swooshSound.play();
    }
    if(ninjaStarG.isTouching(enemy2G)){
        enemy2G.destroyEach(0);
        ninjaStarG.destroyEach();
        score+=1;
        swooshSound.play();
    }
    if(ninjaStarG.isTouching(enemy3G)){
        enemy3G.destroyEach(0);
        ninjaStarG.destroyEach();
        score+=1;
        swooshSound.play();
    }

   if(ninja.isTouching(enemy1G)||ninja.isTouching(enemy2G)||ninja.isTouching(enemy3G)){
        gameState=END;
        enemy1G.destroyEach();
        enemy2G.destroyEach();
        enemy3G.destroyEach(); 
        gameOverSound.play()       
    
}
    }

    if(gameState===END){
        restart.visible=true;
        ninja.visible=false;
        shootButton.visible=false;

        backGround.velocityX = 0;
        backGround.addImage(backGroundImg2);
        backGround.scale=0.5;
        backGround.x=300;
        collect_ninja_starG.destroyEach();
        ninjaStarG.destroyEach();   
        
        
        
        if(mousePressedOver(restart)){
            backGround.addImage(backGroundImg);
            backGround.scale=0.2;
            gameState = PLAY;
            restart.visible=false;
            //ninja.visible=true;
            ninja.y=250;
            score=0;
            ninja_star_count=0;
            
        }
        
     
}
  
}


function createStar() {
    var ninjaStar = createSprite(100, 100, 60, 10);
    ninjaStar.addImage(ninjaStarImg);
    ninjaStar.x = 50;
    ninjaStar.y=ninja.y;
    ninjaStar.velocityX = 4;
    ninjaStar.lifetime = 150;
    ninjaStar.scale = 0.1; 
    ninjaStarG.add(ninjaStar);
    }
    function spawnStar() {
        if(frameCount%100==0){
            var r= Math.round(random(100,250))
            var collectStar= createSprite(610,r,10,10)
            collectStar.addImage(collectStarImg);
            collectStar.scale=0.06;
            collectStar.velocityX=-(6+score/10)
            collect_ninja_starG.add(collectStar);
        }
        }
function createEnemy(){
   
    var enemy1;
    enemy1 = createSprite(610,240, 15,10);
    enemy1.velocityX = -(6+score/10);

    enemy1.addAnimation("running",enemy1Img);
    

    enemy1.scale=0.2;
    enemy1.lifetime = 170;
    enemy1G.add(enemy1);
    //enemy1.debug=true;
   
    
    enemy1.setCollider("circle",0,0,250);
    
    

}
function createEnemy2(){
 
    var enemy2;
    enemy2 = createSprite(610,250, 15,10);
    enemy2.velocityX = -(6+score/10);

    enemy2.addAnimation("running",enemy2Img);
    

    enemy2.scale=0.2;
    enemy2.lifetime = 170;
    enemy2G.add(enemy2);
    //enemy2.debug=true;
    enemy2.setCollider("circle",0,0,200);
    

}
function createEnemy3(){
 
    var enemy3;
    enemy3 = createSprite(610,250, 15,10);
    enemy3.velocityX = -(6+score/10);

    enemy3.addAnimation("running",enemy3Img);
    

    enemy3.scale=0.2;
    enemy3.lifetime = 170;
    enemy3G.add(enemy3);
    //enemy3.debug=true;

    

    enemy3.setCollider("circle",0,0,250);

}