class Wheel {
    dragPoint=null
    rotationPoint =null

    constructor (x, y ,r) {
        this.x = x
        this.y = y 
        this.r = r
    }

    display(){
        circle(this.x,this.y,this.r)

    }

    update(){
        if (this.dragPoint) {
            this.x = mouseX 
            this.y = mouseY            
        }
        if (this.rotationPoint) {
            this.r = 10 * mouseX / mouseY         
        }

    }

    clicked(){
        if (dist(this.x,this.y,mouseX,mouseY)<this.r) {
            if (dist(this.x,this.y,mouseX,mouseY)>(this.r/2)) {
               this.rotationPoint = {} 
                console.log('outer')  
            } else { this.dragPoint = {}   
                   console.log('inner')   
               
            }
                
            return true    
        }
        
    }

    released() {
        this.dragPoint = null
        this.rotationPoint = null
    }
}