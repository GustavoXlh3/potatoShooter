var potatoSaver;
var potatoSaverImg, panImg, badPanImg, potatoImg;

function preload(){
  potatoSaverImg = loadImage("./assets/potatoSaver.gif");
}

function setup() {
  createCanvas(800, 600);
  potatoSaver = createSprite(300, 60);
  potatoSaver.addImage(potatoSaverImg);
  potatoSaver.scale = 0.1;
}

function draw() {
  // limpa a tela
  background('black');
  if (keyDown("left")){
    potatoSaver.x -= 5;
  }
  if (keyDown("right")){
    potatoSaver.x += 5;
  }
  drawSprites();
}