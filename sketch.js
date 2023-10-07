let wheels =[]

function setup() {
  colorMode(HSB) 
  textAlign(CENTER,CENTER)
  createCanvas(800, 800);

  // son
  son = new p5.PolySynth()
  reverb = new p5.Reverb()
  
  son.setADSR(0.05, 0.2, 0.5, 0.5)
  reverb.process(son, 2, 5);
  reverb.drywet(0.4)
}

function draw() {
  background(20);
  for (const wheel of wheels) {
    wheel.update() 
    wheel.display()  
  }
}

function mousePressed() {
  if ( mouseButton === RIGHT )
    wheels.push( new Wheel(mouseX, mouseY, 300, wheels.length, MAJEURE,0,'D') )  
  else
  for (const wheel of wheels) {
    wheel.clicked()  
  }
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