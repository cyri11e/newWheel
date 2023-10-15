class BoutonXState {
    constructor (x, y ,s, states) {
        this.x = x
        this.y = y 
        this.s = s
        this.states = states
        this.state = 0
    }

    display (){
        strokeWeight(1)
        textSize(this.s)
        textAlign(CENTER)
        text(this.states[this.state],this.x,this.y)       
    }
    
    clicked(){
        if (dist(this.x,this.y,mouseX,mouseY)<50) {   
            this.state=(this.state+1)%(this.states.length)   
            console.log('state'+this.state)        
            return true
        }
    }
}

class BoutonFlip {
    constructor (x, y ,s, pile, face) {
        this.x = x
        this.y = y 
        this.s = s
        this.pile = pile
        this.face = face
        this.isPile = false
    }

    display (){
        strokeWeight(1)
        textSize(this.s)
        textAlign(CENTER)
        text(this.isPile?this.pile:this.face,this.x,this.y)       
    }
    
    clicked(){
        if (dist(this.x,this.y,mouseX,mouseY)<50) {   
            this.isPile=!this.isPile           
            return true
        }
    }
}













class BoutonArpege {
    constructor (x, y ,s) {
        this.x = x
        this.y = y 
        this.l = s
        this.h = s/2
        this.zx = (x+s)/2
        this.zy = (y+s)/2
        this.arpege = 0 // 0 accord 1 ascendant 2 descendant 3 ordre 
        this.nbNote = 3
    }

    display (){
        
        stroke(0,0,100,1)
        // 5 lignes
        for (let index = 0; index < 5; index++){      
            strokeWeight(1)     
            line(this.x,this.y+index*15,this.x+this.l,this.y+index*15)
        }

        if (this.arpege == 0)
            for (let index = 2; index < 5; index++){      
                    this.note(  this.x+this.h/2 ,
                                this.y+(index)*15,100)
            }
        if (this.arpege == 1)
            for (let index = 2; index < 5; index++){      
                    this.note(  this.zx-(index)*15 +this.h/2,
                                this.zy+(index)*15-this.h,100)
            }    
        if (this.arpege == 2)
            for (let index = 2; index < 5; index++){      
                    this.note(  this.zx-(index)*15 +this.h/2,
                                this.zy-(index)*15+this.h/2,100)
            }
        if (this.arpege == 3) {
            this.note( this.zx-15,this.zy+15-this.h/2,100)
            this.note( this.zx-30,this.zy+45-this.h/2,100)
            this.note( this.zx,this.zy+30-this.h/2,100)
        
        }
        textSize(this.h)
        text(this.nbNote,this.zx+this.h/2 ,this.zy)
        this.hovered()
    }

    note(x,y,s){
        strokeWeight(2)
        line(x+7,y,x+7,y-s/3)    
        fill(0,0,100) 
        ellipse(x,y,15,10)
    }

    hovered(){
        if ((mouseX>this.x)&&(mouseX<this.x+this.h)&&(mouseY>this.y)&&(mouseY<this.y+this.h)){
            //rect(this.x,this.y, this.h, this.h)
            return('G')
        }  
        if ((mouseX>this.x+this.h)&&(mouseX<this.x+this.l)&&(mouseY>this.y)&&(mouseY<this.y+this.h)){
            //rect(this.x+this.h,this.y, this.h, this.h)
            return('D')
        }       
    }

    clicked(){
        if (this.hovered()=='D') {
            this.nbNote=3+((this.nbNote-3)+1)%2
            return true
        }
        if (this.hovered()=='G') {
            this.arpege=(this.arpege+1)%4
            return true
        }
        
    }


}