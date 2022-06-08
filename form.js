class Form {
  constructor() {
    this.fase2 = createButton("Potato Catcher");
    this.fase3 = createButton("Potato Shooter");
    this.classGame;
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }

  hide() {
    this.fase2.hide();
    this.fase3.hide();
  }

  handleMousePressed() {
    this.fase2.mousePressed(() => {
      this.hide();
      stateFase = 1;
      this.classGame = new PotatoCatcher();
    });

    this.fase3.mousePressed(() => {
      this.hide();
      stateFase = 1;
      this.classGame = new PotatoShooter();
    });
  }

  setElementsStyle() {
    this.fase2.class("customButton");
    this.fase3.class("customButton")
  }

  setElementsPosition() {
    this.fase2.position(width / 4, height / 2 - 20);
    this.fase3.position(width / 2, height / 2 - 20);
  }

  getGame() {
    this.classGame.play();
  }
}
