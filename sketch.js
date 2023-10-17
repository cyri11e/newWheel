let gammes =[]

function setup() {
  createCanvas(windowWidth, windowHeight);

  let chromatique = new Scale(0,CHROMATIQUE,0) 
  let quinte = new Scale(0,CYCLE,0)
  let majeur = new Scale(0,MAJEURE,0) 

  colorMode(HSB) 
  textAlign(CENTER,CENTER)

  gammes.push( new Wheel(180,180,100,majeur))
  gammes.push( new Wheel(200,500,100,chromatique) )
  gammes.push( new Wheel(500,500,100,quinte))
}

function draw() {
  background(0)
  gammes.forEach(gamme => {
    gamme.display()
  })

}
