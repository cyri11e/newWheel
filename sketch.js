let wheels =[]

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  for (const wheel of wheels) {
    wheel.display( mouseX, mouseY, random(100) )  
  }
}

function mousePressed() {
  if ( mouseButton() == 'RIGHT' )
    wheels.push( new Wheel(mouseX, mouseY, random(100)) )  

  for (const wheel of wheels) {
    wheel.display( mouseX, mouseY, random(100) )  
  }
}