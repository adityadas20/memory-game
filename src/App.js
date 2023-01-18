import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'


const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //random return 0 or 1 therefore it becomes -0.5 and 0.5 and sort function swaps if val>0 hence a randomly shuffled array is generated
      .map((card) => ({ ...card, id: Math.random() })) //each card object is taken which initially just has {src:""} and an id is added so now object becomes {src:"", id:''}

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setWon(false)
  }

  //handle a choice
  const handleChoice = (card) => {
    (choiceOne && card.id !== choiceOne.id) ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //reset choices & increase turn value
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setDisabled(false)
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceTwo) {
      setDisabled(true)
      if (choiceTwo.src === choiceOne.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src)
              return { ...card, matched: true }
            else
              return card
          })
        })
      }
      setTimeout(() => resetTurn(), 1000)
      let count = 0
      cards.map(card => {
        if (card.matched)
          count++
      })
      console.log(count, cards.length)
      if (count == cards.length - 2)
        setWon(true)
    }
  }, [choiceTwo])

  useEffect(() => {
    shuffleCards();
  }, [])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <h2>Number Of Turns: {turns}</h2>
      <button onClick={shuffleCards}>New Game</button>
      {
        (!won) ?
          <div className="card-grid">
            {
              cards.map(card => (
                <SingleCard key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} card={card} disabled={disabled} />
              ))
            }
          </div>
          :
          <h1>Hurrayy, you won in {turns} turns!!!</h1>
      }
    </div>
  );
}

export default App