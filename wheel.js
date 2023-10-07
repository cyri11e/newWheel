class Wheel {
    dragPoint=null
    rotationPoint =null

    constructor (x, y ,r, tonalite, relativeScale, mode , noteType) {
        this.x = x
        this.y = y 
        this.r = r
        this.mode = mode
        this.tonalite = tonalite
        this.noteType = noteType
        this.startScale = relativeScale
        this.relativeScale = this.setMode(relativeScale)
        this.absoluteScale = this.getAbsoluteScale()
        this.notes = this.getNotes()
        this.noteNames = this.getNotesNames()
        this.coords =[]
        this.selectedNotes =[]
        this.accords=[]
        this.getAccords()
    }

    // renvoi un accord a partir d une note
    harmonise(degre,nbNotes,listeNotes=[degre]) {  // !! recursif !! 

        let degreTierce = this.getTierce(degre)
        listeNotes.push(degreTierce)
        if (nbNotes > 1) { // n a de sens qu a partir de 2 notes  
            return this.harmonise(degreTierce,nbNotes-1,listeNotes)
        } else {
            console.log('harmonise result :'+listeNotes)

            //this.accords.push(listeNotes)
            return listeNotes
        }

    }    
    // rempli le tableau accords avec toutes les infos necessaires
    getAccords(){
        let d,accord =null
         for (let degre = 0; degre < this.absoluteScale.length; degre++) {
             accord = this.harmonise(degre,2)
             d = (degre%7)
             this.accords.push({degre : d+1,
                                noNote : this.notes[d],
                                nomNote : this.getNoteName(this.notes[d]%12, 'N'),
                                nomAccord : this.getNomAccord(accord), 
                                accord : accord,
                                degreAccord : this.getDegreAccord(accord)})
            }            
            console.log('getaccord result :'+accord)

        return accord
        
    }
   
    getNomAccord(accord){
        let noteName
        noteName = this.getNoteName(this.notes[accord[0]],'N')
        console.log('notename '+ noteName)
    
        if ( this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[1]] ) == 3) 
            if ( this.intervaleNote( this.absoluteScale[accord[1]],this.absoluteScale[accord[2]] ) == 3) 
                return noteName+'°'
            else
                return noteName+'m'
        else
            if ( this.intervaleNote( this.absoluteScale[accord[1]],this.absoluteScale[accord[2]] ) == 3) 
                return noteName+''
            else
                return noteName+'+'
    }
    
    getDegreAccord(accord, typeNote){
        let noteName
        noteName = this.getNoteName(this.notes[accord[0]],typeNote)
        console.log('notename '+ noteName)
    
        if ( this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[1]] ) == 3) 
            if ( this.intervaleNote( this.absoluteScale[accord[1]],this.absoluteScale[accord[2]] ) == 3) 
                return noteName+'°'
            else
                return (noteName)
        else
            if ( this.intervaleNote( this.absoluteScale[accord[1]],this.absoluteScale[accord[2]] ) == 3) 
                return (noteName+'').toUpperCase()
            else
                return (noteName+'+').toUpperCase()
    }

    getNotesNames(){
        return this.notes.map((n)=>this.getNoteName(n%12, 'N'))
    }

    // etape 1 : creer la gamme absolue à partir d'une echelle relative
    getAbsoluteScale() {
        let degres = [0]
        for (let degre = 0; degre < this.relativeScale.length; degre++) {
            this.relativeScale.reduce( (acc, val, index) => degres[index] = acc + val, 0)   
        }
        return [0].concat(degres).map((intervale)=> intervale*2)    
    }
    
    // etape 2 : on creer une gamme avec la tonalite
    getNotes(){
        return this.absoluteScale.map((degre)=>(degre+this.tonalite))
    }
    getNoteName(note,noteType=this.noteType) {
        //console.log('recu par getnotename '+note )
        if (noteType=='N') { // note
            if ( [0,2,4,7,9,11].includes(this.tonalite)) { 
                return NOTES[0][note%12]
            } else { 
                return NOTES[1][note%12]
            } 
        } else
        if (noteType=='D') { // degres
            return this.notes.map(n=>n%12).indexOf(note%12)+1 //this.notes.indexOf(note)+1    
        } else
        if (noteType=='C') { // degre accords
            return this.accords[this.absoluteScale.indexOf(note%12)].degre   
        } else
        if (noteType=='A') { // accords
            return DEGRES[this.absoluteScale.indexOf(note%12)]  
        } 
    }

    display(){
        let note,noteName,angle1,x2,y2
        this.coords = []
        // on ne dessine que les premieres note sans la tonalite a l octave
        for (let index = 0; index < this.absoluteScale.length -1; index++) {
            const degre = this.absoluteScale[index];

            this.coordsIntervals = []
            noFill()
            strokeWeight(1)
            stroke(0, 0, 100, 1)
            circle(this.x, this.y, this.r*2.5 )
            circle(this.x, this.y, this.r*2.3 )
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
            note = this.notes[index]

            noteName = this.noteNames[index]
            fill(0, 0, 0, 1)
            textSize(this.r/6)
            text(noteName,x2, y2)
            
            
            this.coords.push(new p5.Vector(x2,y2))
            
            // selected notes 
            if ( this.selectedNotes.includes(index)){
                //console.log('selected'+index)
                stroke(50, 0 ,100, 1-(frameCount%30)/30)
                noFill()
                circle(x2,y2,this.r/4+ frameCount%30)
                
            }
        }
        
        // cercles exterieurs
        fill(0, 100 ,100, 0.5)
        stroke(0, 100 ,100, 0.5)
        circle(this.x,this.y,this.r/2)
        fill(0, 100 ,100, 1)
        stroke(0, 100 ,0, 1)
        circle(this.x,this.y,this.r/4)
        
        // note centrale / tonalite
        fill(0, 0, 0, 0.5)
        textSize(this.r)
        text(this.getNoteName(this.notes[0],'N'),this.x, this.y)
        textSize(this.r/4)
        text(MODES[this.mode],this.x, this.y+this.r/2)
        if (this.selectedNotes.length>1) this.intervalsShow(this.selectedNotes)        
    }
    
    intervalsShow(listeNotes) { 
        let x1,x2,y1,y2
        for (let i = 0; i < listeNotes.length; i++) {
            for (let j = i+1; j < listeNotes.length; j++) {
                let note1 = this.notes[listeNotes[i]]
                let note2 = this.notes[listeNotes[j]]
                
                x1 = this.coords[listeNotes[i]].x;
                y1 = this.coords[listeNotes[i]].y;
                x2 = this.coords[listeNotes[j]].x;
                y2 = this.coords[listeNotes[j]].y;
                
                let intervale = this.intervaleDegre(note1,note2)
                stroke(0, 0, 100, 0.5)
                fill(0, 0, 100, 0.5)
                strokeWeight(1)
                line(x1, y1, x2, y2)                   

                textSize(this.r/10)
                circle((x1+x2)/2 , (y1+y2)/2, this.r/6)
                text(INTERVALES[intervale].short, (x1+x2)/2 , (y1+y2)/2)
                
                this.coordsIntervals.push({x : (x1+x2)/2, y : (y1+y2)/2 ,notes :[note1,note2]})
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
        if (dist(this.x,this.y,mouseX,mouseY)<this.r/6) {
            console.log(keyCode)
            if (keyCode == 16) {
                this.rotationPoint = {}  
            } else { 
                this.dragPoint = {}                     
            }  
        }
        // clic notes
        for (const [n, coord] of this.coords.entries()) {
            if (dist(coord.x,coord.y,mouseX,mouseY)< (this.r/5)) {
                if (this.selectedNotes.includes(n) ) 
                    this.selectedNotes.splice(this.selectedNotes.indexOf(n),1)
                else 
                    this.selectedNotes.push(n)

                this.playNote(this.notes[n])
            }   
        }        
        // clic interval
        this.coordsIntervals.forEach(coord => {
            if (dist(coord.x,coord.y,mouseX,mouseY)< (this.r/10)) {
                console.log(coord.notes.length)
                for (let index = 0; index < coord.notes.length; index++) {
                    console.log('notes interval a jouer'+coord.notes) 
                    this.playNote(coord.notes[index], index*0.2)
                }
                //coord.notes.map((note,index)=>this.playNote(note, index*0.2))
            }   
        })
    }

    released() {
        this.dragPoint = null
        this.rotationPoint = null
        keyCode = null
    }

    keyPressed(){
        console.log(keyCode +' / '+ this.noteType)
        if (keyCode == 67) this.noteType='C'
        if (keyCode == 68) this.noteType='D'
        if (keyCode == 78) this.noteType='N'
        if (keyCode == 65) this.noteType='A'
        if ( keyCode == ENTER) {
            if ( this.selectedNotes.length > 1 )
                //this.playNotes(this.selectedNotes.map((n)=>(this.notes[n])), 0.2)
                this.selectedNotes.map( (note,index)=>this.playNote(this.notes[note], index*0.2))
            else
                this.notes.map( (note,index)=>this.playNote(note, index*0.2))

        }
        if ( keyCode == RIGHT_ARROW) {
            this.tonalite = ((this.tonalite+1)%12)
            console.log( 'tonalite +'+this.tonalite)
        }
        if ( keyCode == LEFT_ARROW) {
            if ( this.tonalite>0)
                this.tonalite = this.tonalite-1       
            else 
                this.tonalite = 11
        console.log( this.tonalite)           
        }

        if ( keyCode == BACKSPACE) {
            this.selectedNotes =[]
        }

        // modes
        if ( keyCode == UP_ARROW) {
            this.mode = ((this.mode+1)%6) 
            console.log('MODE' + this.mode)    
        }
        if ( keyCode == DOWN_ARROW ) {
            if ( this.mode>0)
                this.mode = this.mode-1       
            else 
                this.mode = 6
        console.log('MODE' + this.mode)           
        } 


        this.relativeScale = this.setMode(this.startScale)
        this.absoluteScale = this.getAbsoluteScale()
        this.notes = this.getNotes()
        this.noteNames = this.notes.map((n)=>this.getNoteName(n%12, 'N'))
        this.accords = []
        this.getAccords()

    }

    keyReleased(){
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


    soundNote(note){       
        return midiToFreq(note+60)
    }

    playNote(note, delai=0) {
        userStartAudio()           
        son.play( this.soundNote(note), 0.3, delai, 0.1);
    } 

    playNotes(notes, delai=0) {   
        let range = 4
        userStartAudio();
        console.log('note jouée '+ notes )

        for (let note = 0; note < notes.length; note++) {        
          if (NOTES[0][notes[note]] >= NOTES[0][this.tonalite] ) range--
          if (NOTES[0][notes[note]] >= 'A' ) range++                     
            son.play( NOTES[0][notes[note]]+range, 0.3, note*delai, 0.1);            
        }
    }  
    
    rotateArray = (arr, k) => arr.concat(arr).slice(k, k+arr.length);
    
    setMode(arr){ 
        return this.rotateArray(arr, this.mode)
    }
    
    getTierce(index) {
        let note = this.absoluteScale[index] 
        let m3index = this.absoluteScale.indexOf((note+3)%12)
        let M3index = this.absoluteScale.indexOf((note+4)%12)
        let indexTierce = max(m3index,M3index)
       
        if (indexTierce != -1)
            return indexTierce
        else 
            return false
    }
    

    // recherche des tierces pour former les accords 

}