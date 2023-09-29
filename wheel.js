class Wheel {
    dragPoint=null
    rotationPoint =null

    constructor (x, y ,r, tonalite, relativeScale) {
        this.x = x
        this.y = y 
        this.r = r
        this.tonalite = tonalite
        this.relativeScale = relativeScale
        this.absoluteScale = this.getAbsoluteScale()
        this.notes = this.getNotes()
        this.coords =[]
        this.selectedNotes =[]
    }

    getAbsoluteScale() {
        let degres = [0]
        for (let degre = 0; degre < this.relativeScale.length; degre++) {
            this.relativeScale.reduce( (acc, val, index) => degres[index] = acc + val, 0)   
        }
        degres.pop()
        return [0].concat(degres).map((intervale)=> intervale*2)    
    }

    getNotes(){
        return this.absoluteScale.map((degre)=>(degre+this.tonalite)%12)
    }

    display(){
        this.coords = []

        for (const [index, degre] of this.absoluteScale.entries()) {
            
            let angle1,x2,y2

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
            line(this.x, this.y, x2, y2)
            circle(x2, y2,this.r/5)
            fill(0, 0, 0, 1)
            textSize(this.r/5)
            text(degre,x2, y2)
            this.coords.push(new p5.Vector(x2,y2))

            // selected notes 
            if ( this.selectedNotes.includes(index)){
                //console.log('selected'+index)
                stroke(50, 0 ,100, 1-(frameCount%30)/30)
                noFill()
                circle(x2,y2,this.r/4+ frameCount%30)
                
            }
        }
        stroke(0, 100 ,100, 1)
        circle(this.x,this.y,this.r)
        circle(this.x,this.y,this.r/2)

        if (this.selectedNotes.length>1) this.intervalsShow(this.selectedNotes)

    }

    intervalsShow(tab) { 
        let x1,x2,y1,y2
        for (let i = 0; i < tab.length; i++) {
            for (let j = i+1; j < tab.length; j++) {
                let note1 = this.absoluteScale[tab[i]]
                let note2 = this.absoluteScale[tab[j]]

                console.log(i, j , tab[i],tab[j],note1,note2)
                x1 = this.coords[tab[i]].x;
                y1 = this.coords[tab[i]].y;
                x2 = this.coords[tab[j]].x;
                y2 = this.coords[tab[j]].y;
                console.log( note1, note2)
                let intervale = this.intervaleDegre(note1,note2)
                stroke(0, 0,100 ,1)
                strokeWeight(2)
                if (intervale> 5 ) {
                    curve(x1, y1,x1, y1, x2, y2, x2, y2)
                    
                } else {
                    curve(x1, y1,x1, y1, x2, y2, x2, y2)
                    
                }
                textSize(this.r/8)
                text(intervale, (x1+x2)/2 , (y1+y2)/2)
            }           
        }
    }

    update(){
        if (this.dragPoint) {
            this.x = mouseX 
            this.y = mouseY            
        }
        if (this.rotationPoint) {
            this.r = dist(this.x,this.y,mouseX,mouseY)       
        }

    }

    clicked(){
        // clic centre
        if (dist(this.x,this.y,mouseX,mouseY)<this.r/2) {
            if (dist(this.x,this.y,mouseX,mouseY)> (this.r/4)) {
                this.rotationPoint = {} 
                console.log('outer')  
            } else { 
                this.dragPoint = {}   
                console.log('inner')                  
            }  
        }
        // clic notes
        for (const [n, coord] of this.coords.entries()) {
            console.log('clic sur '+coord)  

            if (dist(coord.x,coord.y,mouseX,mouseY)< (this.r/5)) {
                if (this.selectedNotes.includes(n) ) 
                    this.selectedNotes.pop(1)
                else 
                    this.selectedNotes.push(n)
            }   
        }        
    }

    released() {
        this.dragPoint = null
        this.rotationPoint = null
    }

    intervaleNote(note1, note2) {
        let dist             
            if (note2>note1 ) 
                dist = note2-note1
            else 
                dist = 12 + note2-note1
        return dist
    }

    intervaleDegre(degre1, degre2) {
        return abs(degre2-degre1)
    }

}