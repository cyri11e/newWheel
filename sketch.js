let wheels =[]

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  for (const wheel of wheels) {
    wheel.update() 
    wheel.display()  
  }
}

function mousePressed() {
  if ( mouseButton === RIGHT )
    wheels.push( new Wheel(mouseX, mouseY, random(100)) )  
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