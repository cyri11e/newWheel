let gammes =[]

function setup() {
  createCanvas(windowWidth, windowHeight);

  let chromatique = new Scale(0,CHROMATIQUE,0) 

  colorMode(HSB) 
  textAlign(CENTER,CENTER)

  gammes.push( new Wheel(400,400,200,chromatique))
  //gammes.push( new Scale(0,CYCLE,0) )
  //gammes.push( new Scale(2,MAJEURE,5) )
}

function draw() {
  background(0)
  gammes.forEach(gamme => {
    gamme.display()
  })

}
