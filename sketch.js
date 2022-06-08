var stateFase = 0;
var windowX;
var windowY;
function setup() {
  windowX = windowWidth;
  createCanvas(windowX, windowHeight);
  form = new Form();
}

function draw() {
  if(stateFase == 0) {
    background("black");
    form.display();
  } 
  else if (stateFase == 1) {
    resizeCanvas(windowX, windowY);
    form.getGame();
  }
}
