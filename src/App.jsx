import { useState } from 'react'

import './App.css'

const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

const computeWinner = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      cells[a] &&
      cells[a] === cells[b] &&
      cells[a] === cells[c]
    ) {
      return [a, b, c]
    }
  }
}

function useGameState() {
  const [cells, setCells] = useState([null, null, null, null, null, null, null, null, null]);
  const [currentStep, setCurrentStep] = useState(SYMBOL_O);
  const [winnerSequence, setWinnerSequence] = useState();


  const handleCellClick = (index) => {
    if (cells[index] || winnerSequence) {
      return;
    }
    const cellsCopy = cells.slice()
    cellsCopy[index] = currentStep;
    const winner = computeWinner(cellsCopy);


    setCells(cellsCopy);
    setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    setWinnerSequence(winner)
  }

  const handleResetClick = () => {
    setCells(Array.from({ length: 9 }, () => null));
    setCurrentStep(SYMBOL_X);
    setWinnerSequence(undefined)
  };

  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined
  const isDraw = !winnerSequence && cells.filter(value => value).length === 9;

  return {
    cells, 
    currentStep, 
    winnerSequence, 
    handleCellClick,
    handleResetClick,
    winnerSymbol,
    isDraw
  }
}

function App() {
  const {
    cells, 
    currentStep, 
    winnerSequence, 
    handleCellClick,
    handleResetClick,
    winnerSymbol,
    isDraw
  } = new useGameState()

  return (
    <div className="game">
      <GameInfo
        isDraw={isDraw}
        winnerSymbol={winnerSymbol}
        currentStep={currentStep}
      />
      <div className="game-field">
        {cells.map((symbol, index) => (
          <GameCell 
            key={index}
            symbol={symbol} 
            isWinner={winnerSequence?.includes(index)} 
            onClick={() => handleCellClick(index)} 
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleResetClick}>Сбросить</button>
    </div>
  )
}

function GameInfo({ isDraw, winnerSymbol, currentStep }) {
  if (isDraw) {
    return (
      <div className="game-info">
        Ничья
      </div>
    )
  }

  if (winnerSymbol) {
    return (
      <div className="game-info">
        Победитель: <GameSymbol symbol={winnerSymbol} />
      </div>
    )
  }

  return (
    <div className="game-info">
      Ход: <GameSymbol symbol={currentStep} />
    </div>
  )
}

function GameCell({ isWinner, onClick, symbol }) {
  return (
    <button
      className={`cell ${isWinner ? 'cell--win' : ''}`}
      onClick={onClick}
    >
      {symbol ? <GameSymbol symbol={symbol} /> : null}
    </button>
  )
}

function GameSymbol({ symbol }) {
  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return 'symbol--o';
    if (symbol === SYMBOL_X) return 'symbol--x';
    return '';
  }
  return <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
}

export default App
