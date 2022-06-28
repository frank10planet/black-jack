 const miModulo = ( () =>{
    'use strict'

        let deck=[];
        const tipos =['C','D','H','S',],
        especiales =['A','J','Q','K',];
        
        //conteo de puntos
        let puntosJugadores = [];
        
      
        
        //EVENTOS
        const btnPedir = document.querySelector('#btnPedir'),
           btnDetener  =   document.querySelector('#btnDetener'),
           btnNew      =     document.querySelector('#btnNew');
        
        const divCartasJugadores = document.querySelectorAll('.divCartas'),
                  puntosConteo =document.querySelectorAll('small');

        const inicializarJuego = (numJugadores = 2) =>{
            deck=crearDeck();
            puntosJugadores = [];
            for(let i = 0; i < numJugadores; i++){
                puntosJugadores.push(0);
    
            }
            puntosConteo.forEach( elem => elem.innerText = 0);
            divCartasJugadores.forEach( elem => elem.innerHTML = '');
            
        
            btnDetener.disabled = false ;
            btnPedir.disabled=false;
        

        }          
        
        //esta funcion crea una nueva baraja
        const crearDeck=() =>{
            deck = [];
        for (let i = 2; i <=10 ; i++ ){
            for( let tipo of tipos ){
                deck.push(i + tipo);
        
            }
        }
        
        for ( let tipo of tipos){
            for ( let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        return _.shuffle( deck);
        }
        
        //esta funcion pide una carta
        
        const pedirCarta = () => {
        if(deck===0){
            throw 'no hay mas cartas en el deck'
        }
        return deck.pop();
        }
        
        //valor carta
        const valorCarta = (carta) =>{
            const valor =carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                (valor === 'A')  ? 11 : 10
                :valor * 1;
         }
            //turno = 0 primer jugador, ultimo computadora 
         const acumularPuntos = (carta,turno ) =>{

            puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta( carta);
            puntosConteo[turno].innerText = puntosJugadores[turno];
            return puntosJugadores[turno]

         }
         // crear carta
         const crearCarta = (carta, turno) =>{
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`
            imgCarta.classList.add('cartas');
            divCartasJugadores[turno].append(imgCarta);
    
         }
         //determina ganador
         const determinaGanador=()=>{
            const [puntosMinimos,puntosComputadora]= puntosJugadores;
            setTimeout( () =>{
                if(puntosComputadora === puntosMinimos){
                    alert('empate')
                }else if ( puntosMinimos > 21){
                    alert('GANEE😎, otro juego??')
                }else if(puntosComputadora > 21){
                    alert('GANASTE👍😁😁👍');
                } else{
                    alert('GANEEE 💋')
                }
            },10 );
         }

        // turno computadora
        const turnoComputadora = (puntosMinimos) =>{
            let puntosComputadora= 0;
            do{
        
                const carta = pedirCarta();
                 puntosComputadora=acumularPuntos(carta, puntosJugadores.length -1 );
                crearCarta(carta, puntosJugadores.length -1);
            }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

            determinaGanador();
        }
        
        
        //eventos
        btnPedir.addEventListener('click', () =>{
            const carta = pedirCarta();
            const puntosJugador = acumularPuntos(carta, 0);
            
            crearCarta( carta , 0);

            if (puntosJugador > 21){
                console.warn('lo siento perdiste, sigue apostando');
                btnPedir.disabled = true;
                btnPedir.disabled=true;
                turnoComputadora(puntosJugador);
        
            } else if ( puntosJugador === 21){
                console.warn('21 tu dia de suerte 🤞🤞😎');
                btnPedir.disabled = true;
                btnPedir.disabled=true;
                turnoComputadora(puntosJugador);
            }
        
        });
        
        btnDetener.addEventListener('click' ,() =>{
            btnDetener.disabled = true ;
            btnPedir.disabled=true;
            turnoComputadora(puntosJugadores[0]);
        });
        
        
        btnNew.addEventListener('click' , () =>{
           inicializarJuego();
        
        
        })
        

        return{
             nuevoJuego: inicializarJuego

        };





})();




