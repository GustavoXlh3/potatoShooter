var potatoSaver;
var potatoSaverImg, potatoSaverIdleImg, panImg, badPanImg, potatoImg;
var panGroup;

function preload(){
  potatoSaverImg = loadAnimation("./assets/potatoSaver/sprite_0.png", "./assets/potatoSaver/sprite_1.png", "./assets/potatoSaver/sprite_2.png", "./assets/potatoSaver/sprite_3.png");
  potatoSaverIdleImg = loadAnimation("./assets/potatoSaverIdle/sprite_0.png", "./assets/potatoSaverIdle/sprite_1.png", "./assets/potatoSaverIdle/sprite_2.png", "./assets/potatoSaverIdle/sprite_3.png", "./assets/potatoSaverIdle/sprite_4.png");
  panImg = loadImage("./assets/pan.png");
  badPanImg = loadImage("./assets/bad pan.png");
  potatoImg = loadImage("./assets/potato.png");
}

function setup() {
  createCanvas(800, 600);
  potatoSaver = createSprite(300, 60);
  potatoSaver.addAnimation("jogador parado", potatoSaverIdleImg);
  potatoSaver.addAnimation("jogador andando", potatoSaverImg);
  potatoSaver.scale = 1.8;

  panGroup = new Group(); 
}

function draw() {
  // limpa a tela
  background('black');
  if (keyDown("left")){
    potatoSaver.x -= 5;
    potatoSaver.changeAnimation("jogador andando");
  }
  if (keyDown("right")){
    potatoSaver.x += 5;
    potatoSaver.changeAnimation("jogador andando");
  }
  if (keyWentUp("right") || keyWentUp("left")){
    potatoSaver.changeAnimation("jogador parado");
  }
  gerarPanelas(10);
  
  drawSprites();
}

function gerarPanelas(x){
if (frameCount % x == 0){
 var panela = createSprite(random(0,800), 610, 10, 10);
 panela.addImage("panela", panImg);
 panela.scale = 2;
 panela.velocityY = -5;
 panela.lifetime = -width/panela.velocityY;
 panGroup.add(panela);
}
}