import { useEffect, useState } from 'react'
import './App.css'
import Endgame from './components/Endgame';
import SingleCard from './components/SingleCard';

const cardImages=[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false}
]

function App() {
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false)

  const [matched,setMatched]=useState(0)
  useEffect(() => {

    if(choiceTwo && choiceOne){
      setDisabled(true)
        if(choiceOne.src ===choiceTwo.src){
          setMatched(prevState=>prevState+1)
          setCards(prevStates=>{
            return prevStates.map(card=>{
              if(card.src===choiceOne.src){
                return {...card,matched:true}
              }else{
                return card;
              }
            })
          })
          resetTurn();
        }else{
          setTimeout(()=>resetTurn(),1000);  
       }
  }
    
  }, [choiceOne,choiceTwo])

  useEffect(()=>{
    shuffleCards()
  },[])

  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns+1)
    setDisabled(false)
  }

  //shuffle cards
  const shuffleCards=()=>{
    setMatched(0)
    setChoiceTwo(null)
    setChoiceOne(null)
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}));

    setCards(shuffledCards);
    setTurns(0)
  }

  //handle choice

  const handleChoice=(card)=>{
    if(choiceOne){
      setChoiceTwo(card)
    }else{
      setChoiceOne(card)
    }
  }
  return (
    <div className="App">
      {matched!=6 && (<div>
          <h1>Magic Match</h1>
          <button onClick={shuffleCards}>New Game</button>
          <div className='card-grid'>
            {cards.map(function(card){
              return(
                  <SingleCard key={card.id} card={card} handleChoice={handleChoice}
                  
                  flipped={card===choiceOne || card===choiceTwo || card.matched}
                  disabled={disabled}
                  ></SingleCard>
              )
            })}
          </div>
          <p style={{marginLeft:"auto",marginRight:"auto"}}>Turns : {turns}</p>
        </div>)}
      {matched===6 && (
      <div>
       
        <Endgame turns={turns}></Endgame>
        <button onClick={shuffleCards}>Play Again</button>
      </div>)}
    </div>
  );
}

export default App