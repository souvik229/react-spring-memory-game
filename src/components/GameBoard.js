import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./GameBoard.css";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [initialRender, setInitialRender] = React.useState(true);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [timerId, setTimerId] = React.useState(null);
  console.log("HEHE");

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setInitialRender(true);
    setElapsedTime(0);
    if (timerId !==null)
    clearInterval(timerId);
    setTimerId(null);
  };



  useEffect(() => {
    if (!initialRender) {
      // Display the alert message when all cards are matched
      if (matchedCards.length === cards.length/2) {
        alert('Congratulations! You have matched all the cards in '+elapsedTime+' seconds!');
        if (timerId !== null) {
            clearInterval(timerId);
          }
          setTimerId(null);
      }


    } 
    }, [cards, matchedCards, initialRender, timerId]);

    useEffect(() =>{
    if(initialRender) {
      // Generate the initial set of cards
      const cardSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const generatedCards = cardSymbols.reduce((cards, symbol) => {
        const card1 = { id: cards.length + 1, symbol, isFlipped: false };
        const card2 = { id: cards.length + 2, symbol, isFlipped: false };
        return [...cards, card1, card2];
      }, []);

      // Shuffle the cards
      const shuffledCards = shuffleArray(generatedCards);
    //set cards
      setCards(shuffledCards);

      //time
      const id = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      setTimerId(id);
      setInitialRender(false);
    }
  }, [initialRender]);







  
  //CLICK FUNCTION
  const handleClick = (id, symbol) => {
    const flippedCount = flippedCards.length;
    const isCardMatched = matchedCards.includes(symbol);
  
    if (isCardMatched) {
      // Ignore click on matched card
      return;
    }
  
    if (flippedCount < 2) {
      // Flip the clicked card
      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);
  
      // Update the flipped cards
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, { id, symbol }]);
  
      // Check for a match if two cards are flipped
      if (flippedCount === 1) {
        const [card1, card2] = flippedCards;
        if (card1.symbol === symbol) {
          // Match found!
          console.log("Match found");
          setMatchedCards((prevMatchedCards) => [...prevMatchedCards, symbol]);
          setFlippedCards([]);
        } else {
          // No match, flip the cards back after a delay
          console.log("Match not found, flipping back");
          setTimeout(() => {
            const updatedCards = cards.map((card) =>
              card.id === card1.id || card.id === id ? { ...card, isFlipped: false } : card
            );
            setCards(updatedCards);
            setFlippedCards([]);
          }, 500);
        }
      }
    }
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  
  //div return
  return (
    <div className="game-board">
        <button className = "restart-button"onClick={resetGame}>Restart</button>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={card.isFlipped}
            onClick={() => handleClick(card.id, card.symbol)}
          />
        ))}
      </div>
      <div className="timer-container">
      <div className="timer">Elapsed Time: {elapsedTime} seconds</div>
      </div>
    </div>
  );
}

export default GameBoard;
