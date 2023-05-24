import React from "react";
import Card from "./Card";
import './GameBoard.css'
function GameBoard() {
    const [cards, setCards] = React.useState([]);
    const [flippedCards, setFlippedCards] = React.useState([]);
    const [matchedCards, setMatchedCards] = React.useState([]);



    React.useState(() => {
        const cardSymbols = ['A', 'B', 'C', 'D','E','F','G','H'];
        const generatedCards = cardSymbols.reduce((cards, symbol) => {
            const card1 = { id: cards.length + 1, symbol, isFlipped: false };
            const card2 = { id: cards.length + 2, symbol, isFlipped: false };
            return [...cards, card1, card2];
          }, []);
          setCards(generatedCards);
          
        }, []);

    
        

        const handleClick = (id, symbol) => {
            console.log("click!!")
            const flippedCount = flippedCards.length;
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
                  console.log("Match found")
                  setMatchedCards((prevMatchedCards) => [...prevMatchedCards, symbol]);
                  setFlippedCards([]);
                } else {
                  // No match, flip the cards back after a delay
                  console.log("match not found flipping back")
                  setTimeout(() => {
                    const updatedCards = cards.map((card) =>
                      card.id === card1.id || card.id === id ? { ...card, isFlipped: false } : card
                    );
                    setCards(updatedCards);
                    setFlippedCards([]);
                  }, 1000);
                }
              }
            }
          };
        
    return (
        
        <div className="game-board">
            
            <div className="grid">
                {cards.map((card) => (
                    <Card
                    key={card.id}
                    symbol={card.symbol}
                    isFlipped={card.isFlipped}
                    onClick={() => handleClick(card.id, card.symbol)}
                    flippedCards={flippedCards}
                    setFlippedCards={setFlippedCards}
                />           
                ))}
            </div>
        </div>
    );
}
export default GameBoard;
