class Wheel {
    constructor(x,y,r,gamme){
        this.x = x
        this.y = y
        this.r = r
        this.gamme = gamme
    }

    udpate(){

    }

    display(){
        let note,angle,x,y
        strokeWeight(10)
        stroke(0, 100 ,100, 1)
        noFill()
        circle(this.x, this.y,2*this.r)

        for (let index = 0; index < this.gamme.notes.length ; index++) {
            const degre = this.gamme.notes[index];

            // cas des gammes completes a 12 notes
            if (this.gamme.notes.length != 12)
                angle = degre*PI/6 -HALF_PI
            else
                angle = index*PI/6 -HALF_PI

            x = this.x+this.r*cos(angle) 
            y = this.y+this.r*sin(angle)

            stroke((degre*30*7)%360, 100 ,100, 1)
            fill((degre*30*7)%360, 100 ,100, 1)

            strokeWeight(1)
            circle(x, y,this.r*0.3)
            note = this.gamme.noteNames[0][index]
            noStroke(0, 0, 0, 1)
            fill(0, 0 ,0, 1)
            textFont('Georgia')
            textSize(this.r/4)
            this.textNote(note,x,y)

                        
        }
    }

    textNote(note,x,y){
        let shift = this.r/8
        fill(0, 0 ,0, 1)
        textFont('Helvetica')
        textSize(this.r/4)
        for (let index = 0; index < note.length; index++) {
            const e = note[index];
            text(e,x+index*shift,y-index*shift/2)            
            
        }

    }

}