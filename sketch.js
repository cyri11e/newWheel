let wheels =[]

function setup() {
  colorMode(HSB) 
  textAlign(CENTER,CENTER)
  createCanvas(800, 800);

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
    wheels.push( new Wheel(mouseX, mouseY, 300, 4, MAJEURE) )  
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