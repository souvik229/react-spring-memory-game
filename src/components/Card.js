import React from 'react';
import './GameBoard.css';


  

function Card({symbol, onClick, flippedCards, setFlippedCards, id}) {
    const [isFlipped, setIsFlipped] = React.useState(false);

    

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    
        if (!isFlipped) {
            setFlippedCards((prevFlippedCards) => [...prevFlippedCards, { id, symbol }]);
        } 
        else {
            setFlippedCards((prevFlippedCards) =>
                prevFlippedCards.filter((card) => card.id !== id)
            );
        }
    };
    
    
  return (
    <div className="card">
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        
        <div className="card-front">
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}

export default Card;
