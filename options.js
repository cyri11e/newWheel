class BoutonFlip {
    constructor (x, y ,s, pile, face) {
        this.x = x
        this.y = y 
        this.s = s
        this.pile = pile
        this.face = face
        this.isPile = true
    }

    display (){
        strokeWeight(1)
        textSize(this.s)
        textAlign(CENTER)
        text(this.isPile?this.pile:this.face,this.x,this.y)
        
    }

    
    clicked(){
        if (dist(this.x,this.y,mouseX,mouseY)<100) {   
            this.isPile=!this.isPile
            
            return true
        }
    }
}

class BoutonArpege {
    constructor (x, y ,s) {
        this.x = x
        this.y = y 
        this.s = s
        this.arpege = true
    }

    display (){
        strokeWeight(1)
        stroke(0,0,100,1)
        for (let index = 0; index < 5; index++){           
            line(this.x,this.y+index*15,this.x+this.s,this.y+index*15)
            if (index>0&&index<4)
                this.note(this.x+this.s/2 -(this.arpege?0:index*15),this.y+index*15,100)

        }
        
    }

    note(x,y,s){
        strokeWeight(2)
        line(x+7,y,x+7,y-s/3)     
        ellipse(x,y,15,10)
    }
    
    clicked(){
        if (dist(this.x,this.y,mouseX,mouseY)<100) {
            
            this.arpege=!this.arpege
            console.log('arpege '+this.arpege)
            return true
        }
    }


}