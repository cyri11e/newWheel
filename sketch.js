let wheels =[]
let bouton

function setup() {
  colorMode(HSB) 
  textAlign(CENTER,CENTER)
  createCanvas(windowWidth, windowHeight);

  // son
  son = new p5.PolySynth()
  reverb = new p5.Reverb()
  
  son.setADSR(0.05, 0.2, 0.5, 0.5)
  reverb.process(son, 2, 5);
  reverb.drywet(0.4)
  wheels.push( new Wheel(windowWidth/2, windowHeight/2, 200, 1, MAJEURE,1,'N') )
  //bouton = new Bouton(10, 10 , 100)
}

function draw() {
  background(20);
  for (const wheel of wheels) {
    wheel.update() 
    wheel.display()  
  }
  //bouton.display()
}

function mousePressed() {
  if ( mouseButton === RIGHT )
    wheels.push( new Wheel(mouseX, mouseY, 150, 1, MAJEURE,1,'N') )  
  else
  for (const wheel of wheels) {
    wheel.clicked()  
  }
  //bouton.clicked()
}

function mouseReleased() {
  for (const wheel of wheels) {
    wheel.released()  
  }  
}
function keyPressed() {
  for (const wheel of wheels) {
    wheel.keyPressed()  
  }  
}
function keyReleased() {
  for (const wheel of wheels) {
    wheel.keyReleased()  
  }  
}

function onCanvaClic() {

}