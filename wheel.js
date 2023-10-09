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
        this.accords=this.getAccords()
    
    }

    // renvoi un accord a partir d une note
    harmonise(degre,nbNotes,listeNotes=[degre]) {  // !! recursif !! 

        let degreTierce = this.getTierce(degre)
        listeNotes.push(degreTierce)
        if (nbNotes > 1) { // n a de sens qu a partir de 2 notes  
            return this.harmonise(degreTierce,nbNotes-1,listeNotes)
        } else {
            return listeNotes
        }
    } 

    // rempli le tableau accords avec toutes les infos necessaires
    getAccord(degreIndex){
        let d,triade,tetrade =null

        triade = this.harmonise(degreIndex,2)
        tetrade = this.harmonise(degreIndex,3)
        d = (degreIndex%7)

        return {degre : degreIndex+1,
                accord : triade,
                tetrade : tetrade,
                noNote : this.notes[degreIndex],
                nomNote : this.getNoteName(this.notes[degreIndex]%12),
                nomAccord : this.getNomTetrade(tetrade), 
                degreAccord : this.getDegreAccord(triade)}
    }

    getAccords(){
        let accords =[]
        for (let degre = 0; degre < this.absoluteScale.length; degre++) {
            accords.push(this.getAccord(degre))
           }    
           return accords
    }

    getNomTriade(accord){
        let nomAccord
        let tierce,quinte
        nomAccord = this.getNoteName(this.notes[accord[0]])
        tierce = this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[1]] ) 
        quinte = this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[2]] ) 

        if ((tierce == 4) && (quinte == 7))
            return nomAccord
        if ((tierce == 3) && (quinte == 7))
            return nomAccord+'m'
        if ((tierce == 3) && (quinte == 6))
            return nomAccord+'°'
        if ((tierce == 4) && (quinte == 7))
            return nomAccord+'+'

        return '?'
    }
   
    getNomTetrade(accord){
        let nomAccord
        let tierce,quinte,septieme
        nomAccord = this.getNoteName(this.notes[accord[0]])
        tierce = this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[1]] ) 
        quinte = this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[2]] ) 
        septieme = this.intervaleNote( this.absoluteScale[accord[0]],this.absoluteScale[accord[3]] ) 
        
        console.log( tierce,quinte, septieme)
        if ((tierce == 4) && (quinte == 7) && (septieme == 11))
            return nomAccord+'M7'
        if ((tierce == 4) && (quinte == 7) && (septieme == 10))
            return nomAccord+'7'

        if ((tierce == 3) && (quinte == 7) && (septieme == 11))
            return nomAccord+'mM7'
        if ((tierce == 3) && (quinte == 7) && (septieme == 10))
            return nomAccord+'m7'

        if ((tierce == 3) && (quinte == 6) && (septieme == 10))
            return nomAccord+'m7b5'
        if ((tierce == 3) && (quinte == 6) && (septieme == 9))
            return nomAccord+'°7'

        if ((tierce == 4) && (quinte == 7) && (septieme == 11))
            return nomAccord+'+7'

        return '?'
    }
    getDegreAccord(accord){
        let noteName
        noteName = DEGRES[accord[0]%7]

        let n1=this.absoluteScale[accord[0]]
        let n2=this.absoluteScale[accord[1]]
        let n3=this.absoluteScale[accord[2]]
        
        if ( this.intervaleNote( n1,n2 ) == 3) 
            if ( this.intervaleNote( n2,n3 ) == 3) 
                return noteName+'°'
            else
                return (noteName)
        else
            if ( this.intervaleNote( n2,n3 ) == 3) 
                return (noteName+'').toUpperCase()
            else
                return (noteName+'+').toUpperCase()
    }


    //recup des notes d une gamme
    getNotesNames(notes=this.notes){
        for (let famille = 0; famille < NOTES.length; famille++) {
            let g=notes.map(n=>NOTES[famille][n%12])
            console.log(g)
            if (this.checkNotes(g)) {
                this.famille = famille
                return g
            }           
        }
    }
    
    // recup d 'un seule note
    getNoteName(note) {
        // recoit une note absolue 
        return NOTES[this.famille][note%12] 
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

    getNoteLabel(note,noteType=this.noteType) {
        // nom des notes pour affichage 
        if (this.accords.length>0) {
            if (noteType=='N') return this.accords[this.notes.indexOf(note)].nomNote
            else
            if (noteType=='D') return this.accords[this.notes.indexOf(note)].degre 
            else
            if (noteType=='A') return this.accords[this.notes.indexOf(note)].degreAccord 
            else
            if (noteType=='C') return this.accords[this.notes.indexOf(note)].nomAccord
        } else 
            return this.notes.indexOf(note)
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

            noteName = this.getNoteLabel(note)
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
        text(this.getNoteName(this.notes[0]),this.x, this.y)
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

                if ( ['N','D'].includes(this.noteType))
                this.playNote(this.notes[n])
                else
                this.playNotes(this.accords[n].accord.map(e=>this.notes[e]))
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
        this.noteNames = this.getNotesNames()

        //this.accords = []
        this.accords=this.getAccords()

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
    
    noteSuivante(note){
        let lettre = note[0]
        //return String.fromCharCode((65+((lettre.charCodeAt(0)-65)+1)%7)) //String.fromCharCode(lettre.charCodeAt(0)+1)
        let index = NOTES[this.famille].indexOf(note)
        return  NOTES[this.famille][(index+1)%12]+(this.famille==1?'b':'#')


    }


    corrigeNotes(notes){
        let noteDepart =notes[0]


            for (let index = 0; index < notes.length-2; index++) {
                const note = notes[index]
                const suivante = notes[index+1]

                // recherche de note qui apparaissent deux fois
                if ( note[0]== suivante[0]) {

                    notes[index+1]=(this.noteSuivante(suivante[0]) )
                    break  
                } 
            }
         

        return notes
    }

    // recherche des tierces pour former les accords 
    checkNotes(nomNotes){
        return nomNotes.map(e=>e[0]).map((e,i,t)=>t[i]==t[i+1]).indexOf(true)==-1
    }
}