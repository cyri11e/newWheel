const TON = 1
const DEMI_TON = 0.5
const QUINTE = 3.5
const MAJEURE = [TON, TON, DEMI_TON, TON, TON, TON, DEMI_TON]

const CYCLE = [QUINTE,QUINTE,QUINTE,QUINTE,QUINTE,QUINTE,
               QUINTE,QUINTE,QUINTE,QUINTE,QUINTE]
const CHROMATIQUE = [DEMI_TON,DEMI_TON,DEMI_TON,DEMI_TON,DEMI_TON,DEMI_TON,
                     DEMI_TON,DEMI_TON,DEMI_TON,DEMI_TON,DEMI_TON]

const MODES =['Ionien','Dorien', 'Phrygien', 'Lydien', 'Mixolydien', 'Eolien', 'Locrien']
const DEGRES = ['i','ii','iii','iv','v','vi','vii']

const INTERVALES = [{ short : 'P1', long : 'Unisson'},
                    { short : 'm2', long : 'Second Mineure'},
                    { short : 'M2', long : 'Seconde Majeure'},
                    { short : 'm3', long : 'Tierce Mineure'},
                    { short : 'M3', long : 'Tierce Majeure'},
                    { short : 'P4', long : 'Quarte'},
                    { short : 'TT', long : 'Triton'},
                    { short : 'P5', long : 'Quinte'},
                    { short : 'm6', long : 'Sixte Mineure'},
                    { short : 'M6', long : 'Sixte Majeure'},
                    { short : 'm7', long : 'Septieme Mineure'},
                    { short : 'M7', long : 'Septieme Majeure'},
                    { short : 'P8', long : 'Octave'} ]

const NOTES = [ ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ],
                ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ], 
                ['DO','DO#','RE','RE#','MI','FA','FA#','SOL','SOL#','LA','LA#','SI' ],           
                ['DO','REb','RE','MIb','MI','FA','SOLb','SOL','LAb','LA', 'SIb','SI' ],
                ['DO','DI','RE','RI','MI','FA','FI','SO','SI','LA','LI','TI'],           
                ['DO','RA','RE','ME','MI','FA','SE','SO','LE','LA', 'TE','TI' ] ]

const SHARPUS = 0
const FLATUS = 1





    








