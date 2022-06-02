var potatoSaver;
var potatoSaverImg, potatoSaverIdleImg, panImg, badPanImg, potatoImg;

function preload(){
  potatoSaverImg = loadImage("./assets/potatoSaver.gif");
  potatoSaverIdleImg = loadImage("./assets/potatoSaverIdle.gif");
  panImg = loadImage("./assets/pan.png");
  badPanImg = loadImage("./assets/bad pan.png");
  potatoImg = loadImage("./assets/potato.png");
}

function setup() {
  createCanvas(800, 600);
  potatoSaver = createSprite(300, 60);
  potatoSaver.addImage(potatoSaverIdleImg);
}

function draw() {
  // limpa a tela
  background('black');
  if (keyDown("left")){
    potatoSaver.x -= 5;
    potatoSaver.changeImage(potatoSaverImg);
  }
  if (keyDown("right")){
    potatoSaver.x += 5;
    potatoSaver.changeImage(potatoSaverImg);
  }
  drawSprites();
}