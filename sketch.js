var potatoSaver;
var potatoSaverImg, potatoSaverIdleImg, panImg, badPanImg, potatoImg, potatoHeartImg, groundImg;
var panGroup, potatoGroup;
var life = 3;
//menu, jogo1(), jogo2(), jogo3(), jogo4();
var state = "menu";


function preload(){
  potatoSaverImg = loadAnimation("./assets/potatoSaver/sprite_0.png", "./assets/potatoSaver/sprite_1.png", "./assets/potatoSaver/sprite_2.png", "./assets/potatoSaver/sprite_3.png");
  potatoSaverIdleImg = loadAnimation("./assets/potatoSaverIdle/sprite_0.png", "./assets/potatoSaverIdle/sprite_1.png", "./assets/potatoSaverIdle/sprite_2.png", "./assets/potatoSaverIdle/sprite_3.png", "./assets/potatoSaverIdle/sprite_4.png");
  panImg = loadImage("./assets/pan.png");
  badPanImg = loadImage("./assets/bad pan.png");
  potatoImg = loadImage("./assets/potato.png");
  potatoHeartImg = loadImage("./assets/potatoHeart.png");
  groundImg = loadImage("./assets/grass.png");
}

function setup() {
  createCanvas(800, 600);
  potatoSaver = createSprite(300, 70);
  potatoSaver.addAnimation("jogador parado", potatoSaverIdleImg);
  potatoSaver.addAnimation("jogador andando", potatoSaverImg);

  panGroup = new Group(); 
  potatoGroup = new Group();
}

function draw() {
  // limpa a tela
  background(groundImg);
  if (keyDown("left")){
    potatoSaver.x -= 10;
    potatoSaver.changeAnimation("jogador andando");
  }
  if (keyDown("right")){
    potatoSaver.x += 10;
    potatoSaver.changeAnimation("jogador andando");
  }
  if (keyWentUp("right") || keyWentUp("left")){
    potatoSaver.changeAnimation("jogador parado");
  }
  gerarPanelas(100);
  dispararBatatas();
  mostrarVida(life);
  transformarPanelas(100);

  //nao lembro como acessa a posiçao da panela do grupo
  if (panGroup.y < 0){
    life =- 1;
  }
  console.log(panGroup.size());

  drawSprites();
}

function gerarPanelas(x){
  if (frameCount % x == 0){
   var panela = createSprite(random(0,800), 610, 10, 10);
   panela.addImage("panela", panImg);
   panela.addImage("panela do mal", badPanImg);
   panela.velocityY = -5;
   panela.lifetime = -width/panela.velocityY;
   panGroup.add(panela);
  }
}

function transformarPanelas(x){
  if(frameCount % x == 0) {
    if(panGroup.size() > 0) {
      var index = Math.round(random(0, panGroup.size() - 1));
      if(panGroup[index]) {
        panGroup[index].changeAnimation("panela do mal");
      }
    }
  }

  setTimeout(() => {
    if(panGroup[index]) {
      panGroup[index].changeAnimation("panela");
    }
  }, 2000);
}

function dispararBatatas(){
  if (keyDown("space") && (potatoGroup.size() == 0 || potatoGroup.get(potatoGroup.size()-1).y>200)){
    var potato = createSprite(potatoSaver.x, potatoSaver.y);
    potato.addImage(potatoImg);
    potato.velocityY = +8;
    potato.lifetime = width/potato.velocityY;
    potatoGroup.add(potato);
  }
}

function mostrarVida(x){
  for (var i = 1; i<= x; i++){
    image(potatoHeartImg, width-30*i, 5, 20, 20);
  }
}