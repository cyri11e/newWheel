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
        let note,angle1,x2,y2
        for (let index = 0; index < this.gamme.notes.length ; index++) {
            const degre = this.gamme.notes[index];

            noFill()
            strokeWeight(2)
            textSize(20)
            angle1 = -HALF_PI            
            angle1 = degre*PI/6 -HALF_PI
            x2 = this.x+this.r*cos(angle1) 
            y2 = this.y+this.r*sin(angle1)
            stroke(degre*30, 100 ,100, 1)
            fill(degre*30, 100 ,100, 1)
            strokeWeight(5)
            circle(x2, y2,this.r*0.4)
            note = this.gamme.noteNames[0][index]
            noStroke(0, 0, 0, 1)
            fill(0, 0 ,0, 1)
            textFont('Georgia')
            textSize(this.r/4)
            this.textNote(note,x2,y2)
                        
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