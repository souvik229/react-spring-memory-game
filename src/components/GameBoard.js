import React from "react";
import Card from "./Card";
import './GameBoard.css'
function GameBoard() {
    const [cards, setCards] = React.useState([]);
    const [flippedCards, setFlippedCards] = React.useState([]);


    React.useState(() => {
        const cardSymbols = ['A', 'B', 'C', 'D','E','F','G','H'];
        const generatedCards = cardSymbols.reduce((cards, symbol) => {
            const card1 = { id: cards.length + 1, symbol, isFlipped: false };
            const card2 = { id: cards.length + 2, symbol, isFlipped: false };
            return [...cards, card1, card2];
          }, []);
          setCards(generatedCards);
          
        }, []);

    
        

        const handleClick = (id) => {
            console.log('Clicked card ID:', id); };

    return (
        
        <div className="game-board">
            
            <div className="grid">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        symbol={card.symbol}
                        isFlipped={card.isFlipped}
                        onClick={() => handleClick(card.id)}
                    
                    />
                ))}
            </div>
        </div>
    );
}
export default GameBoard;
