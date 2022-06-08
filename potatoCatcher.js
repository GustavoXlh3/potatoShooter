class PotatoCatcher {
  constructor() {
    this.chao;
    this.chaoImg;
    this.chaoCld;
    this.batata;
    this.batataFrita;
    this.garfo;
    this.batataMal;
    this.batataImg;
    this.batataFritaImg;
    this.garfoImg;
    this.batataMalImg;
    this.jogador;
    this.jogadorAnim;
    this.jogadorBaixoImg;
    this.jogadorPerderImg;
    this.JOGAR = 0;
    this.PERDER = 1;
    this.estado = this.JOGAR;
    this.grupoBatatas;
    this.grupoObstaculos;
    this.grupoBatatasFritas;
    this.pontuacao;
    this.loadFiles();
    this.configurations();
  }

  criarBatatas() {
    if (frameCount % 400 == 0) {
      this.batata = createSprite(900, 200);
      this.batata.velocityX = -5;
      this.batata.lifetime = 225;
      this.batata.addImage(this.batataImg);
      this.grupoBatatas.add(this.batata);
    }
    if (frameCount % 1900 == 0) {
      this.batataFrita = createSprite(900, 200);
      this.batataFrita.velocityX = -7;
      this.batataFrita.lifetime = 180;
      this.batataFrita.addImage(this.batataFritaImg);
      this.grupoBatatasFritas.add(this.batataFrita);
    }
  }

  criarObstaculos() {
    if (frameCount % 300 == 0) {
      this.garfo = createSprite(900, 320);
      this.garfo.velocityX = -6;
      this.garfo.lifetime = 150;
      this.garfo.addImage(this.garfoImg);
      this.grupoObstaculos.add(this.garfo);
      this.garfo.setCollider("rectangle", 0, 0, 10, 85);
      //garfo.debug = true;
    }
    if (frameCount % 720 == 0) {
      this.batataMal = createSprite(910, 260);
      this.batataMal.velocityX = -8;
      this.batataMal.lifetime = 160;
      this.batataMal.addImage(this.batataMalImg);
      this.grupoObstaculos.add(this.batataMal);
    }
  }

  resetar() {
    this.estado = this.JOGAR;
    this.grupoBatatas.destroyEach();
    this.grupoBatatasFritas.destroyEach();
    this.grupoObstaculos.destroyEach();
    this.pontuacao = 0;
    this.jogador.addImage(this.jogadorAnim);
  }

  loadFiles() {
    this.chaoImg = loadImage("./assets/potatoCatcher/chao.png");
    this.jogadorAnim = loadImage("./assets/potatoCatcher/jogadorAnim.gif");
    this.jogadorBaixoImg = loadImage("./assets/potatoCatcher/jogadorBaixo.png");
    this.jogadorPerderImg = loadImage(
      "./assets/potatoCatcher/jogadorPerder.png"
    );
    this.batataImg = loadImage("./assets/potatoCatcher/batata.png");
    this.batataFritaImg = loadImage("./assets/potatoCatcher/batatafrita.png");
    this.batataMalImg = loadImage("./assets/potatoCatcher/batataMal.png");
    this.garfoImg = loadImage("./assets/potatoCatcher/garfo.png");
  }

  configurations() {
    windowX = 900;
    windowY = 400;
    this.jogador = createSprite(60, 300);
    this.jogador.addImage(this.jogadorAnim);
    //jogador.debug = true;
    this.chao = createSprite(450, 375);
    this.chao.addImage(this.chaoImg);
    this.chaoCld = createSprite(450, 375, 900, 50);
    this.chaoCld.visible = false;
    this.grupoBatatas = new Group();
    this.grupoBatatasFritas = new Group();
    this.grupoObstaculos = new Group();
    this.pontuacao = 0;
  }

  play() {
    background(30, 240, 240);
    text("pontuaçao: " + Math.round(this.pontuacao), 800, 50);

    if (this.estado == this.JOGAR) {
      if (this.chao.x < 0) {
        this.chao.x = 450;
      }

      if (keyDown("space") && this.jogador.y >= 290) {
        this.jogador.velocityY = -10;
      }

      if (keyDown("s")) {
        this.jogador.addImage(this.jogadorBaixoImg);
        this.jogador.setCollider("rectangle", 0, 0, 50, 60);
        this.jogador.velocityY = this.jogador.velocityY + 1;
      } else {
        this.jogador.addImage(this.jogadorAnim);
        this.jogador.setCollider("rectangle", 0, 0, 60, 100);
      }

      if (this.grupoObstaculos.isTouching(this.jogador)) {
        this.estado = this.PERDER;
      }

      if (this.grupoBatatas.isTouching(this.jogador)) {
        this.pontuacao += 1;
        this.batata.lifetime = 0;
      }
      if (this.grupoBatatasFritas.isTouching(this.jogador)) {
        this.pontuacao += 10;
        this.batataFrita.lifetime = 0;
      }
      this.chao.velocityX = -6;

      this.criarBatatas();
      this.criarObstaculos();

      this.jogador.velocityY = this.jogador.velocityY + 0.5;
    } else if (this.estado == this.PERDER) {
      this.chao.velocityX = 0;
      this.grupoBatatas.setVelocityXEach(0);
      this.grupoBatatasFritas.setVelocityXEach(0);
      this.grupoObstaculos.setVelocityXEach(0);
      this.jogador.velocityY = 0;

      this.grupoBatatas.setLifetimeEach(-1);
      this.grupoBatatasFritas.setLifetimeEach(-1);
      this.grupoObstaculos.setLifetimeEach(-1);

      this.jogador.addImage(this.jogadorPerderImg);

      text("presione Espaço para reiniciar", 400, 200);

      if (keyDown("space") && this.estado == this.PERDER) {
        this.resetar();
      }
    }

    this.jogador.collide(this.chaoCld);
    drawSprites();
  }
}
