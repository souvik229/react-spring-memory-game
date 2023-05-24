import React from "react";
import "./GameBoard.css";

function Card({ symbol, onClick, isFlipped }) {
  return (
    <div className="card">
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        <div className="card-front"></div>
        <div className="card-back">{symbol}</div>
      </div>
    </div>
  );
}

export default Card;
