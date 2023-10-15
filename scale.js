class Scale {

    constructor (tonalite, relativeScale, mode) {
        this.mode = mode
        this.tonalite = tonalite
        //this.startScale = relativeScale
        this.relativeScale = this.applyMode(relativeScale,mode)
        this.absoluteScale = this.getAbsoluteScale(this.relativeScale)
        this.notes = this.getNotes(this.absoluteScale,this.tonalite)

    }

    rotateArray = (arr, k) => arr.concat(arr).slice(k, k+arr.length)

    applyMode(scale,mode){ 
        return this.rotateArray(scale, mode)
    }

    
    // etape 1 : creer la gamme absolue à partir d'une echelle relative
    getAbsoluteScale(scale) {
        let degres = [0]
        for (let degre = 0; degre < scale.length; degre++) {
            scale.reduce( (acc, val, index) => degres[index] = acc + val, 0)   
        }
        return [0].concat(degres).map((intervale)=> (intervale*2)%12)    
    }

    // etape 2 : on creer une gamme avec la tonalite
    getNotes(scale,tonalite){
        return scale.map((degre)=>(degre+tonalite))
    }

    // verification d une gamme si toutes les notes son unique OK
    // fonctionne uniquement avec note en LETTRE et SOLFA
    checkNotes(nomNotes){
        return nomNotes.map(e=>e[0]).map((e,i,t)=>t[i]==t[i+1]).indexOf(true)==-1
    }

    getNotesNames(notes,dieseBemol=0){
        let noteNames =[]

        if (notes.length>7) {  // gamme speciale non diatoniques
            noteNames.push(notes.map(n=>NOTES[dieseBemol][n%12])) 
            noteNames.push(notes.map(n=>NOTES[2+dieseBemol][n%12])) 
        } else {
            let g=notes.map(n=>NOTES[0][n%12]) 
            if (this.checkNotes(g)) {
                noteNames.push(g)
                noteNames.push(notes.map(n=>NOTES[2][n%12])) 
            }
            else {
                noteNames.push(notes.map(n=>NOTES[1][n%12])) 
                noteNames.push(notes.map(n=>NOTES[3][n%12])) 
            }

        }



        for (let famille = 0; famille < NOTES.length; famille++) {
            let g=notes.map(n=>NOTES[famille][n%12])
            if (notes.length<12) // diatonique
                if (this.checkNotes(g)) {
                    //if ( famille < 2) this.famille = famille
                    noteNames.push(g)
                }           
            else 
                noteNames.push(g)     
        }
        return noteNames

    }
}