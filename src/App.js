import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'


const cardImages = [
  { "src": "/img/pic1.png", matched: false },
  { "src": "/img/pic2.jpeg", matched: false },
  { "src": "/img/pic3.png", matched: false },
  { "src": "/img/pic4.png", matched: false },
  { "src": "/img/pic5.png", matched: false },
  { "src": "/img/pic6.jpeg", matched: false },
  { "src": "/img/pic7.jpeg", matched: false },
  { "src": "/img/pic8.jpeg", matched: false },
  { "src": "/img/pic9.jpeg", matched: false },
  { "src": "/img/pic10.jpeg", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)
  const [difficulty, setDifficulty] = useState(0);

  // shuffle cards
  const shuffleCards = (diff) => {

    // console.log(difficulty)
    let size = cardImages.length - (2 * (3 - diff));
    let tempCards = cardImages.slice(0, size)
    const shuffledCards = [...tempCards, ...tempCards]
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
      setTimeout(() => resetTurn(), 500)
      let count = 0
      cards.map(card => {
        if (card.matched)
          count++
      })

      if (count === cards.length - 2)
        setWon(true)
    }
  }, [choiceTwo])

  let handleDifficulty = (diff) => {
    setDifficulty(diff)
    shuffleCards(diff)
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <h2>Number Of Turns: {turns}</h2>
      <button onClick={() => setDifficulty(0)}>New Game</button>
      {
        (difficulty > 0) ?
          (!won) ?
            <div className={`card-grid dif-${difficulty}`}>
              {
                cards.map(card => (
                  <SingleCard key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} card={card} disabled={disabled} />
                ))
              }
            </div>
            :
            <h1>Hurrayy, you won in {turns} turns!!!</h1>
          :
          <div className='difficulty'>
            <button onClick={() => handleDifficulty(1)}>Difficulty level: 1</button>
            <button onClick={() => handleDifficulty(2)}>Difficulty level: 2</button>
            <button onClick={() => handleDifficulty(3)}>Difficulty level: 3</button>
          </div>
      }
    </div>
  );
}

export default App