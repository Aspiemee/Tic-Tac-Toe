import './App.css'



function App() {
  return (
    <div className='game'>
      <div className='game-info'>
        Ход: <span className='symbol symbol--x'>X</span>
      </div>
      <div className="game-field">
        <button className='cell cell--win'><span className="symbol symbol--x">X</span></button>
        <button className="cell"><span className="symbol symbol--o">O</span></button>
        <button className="cell"></button>
        <button className="cell cell--win"><span className="symbol symbol--x">X</span></button>
        <button className="cell"></button>
        <button className="cell"><span className="symbol symbol--o">O</span></button>
        <button className="cell cell--win"><span className="symbol symbol--x">X</span></button>
        <button className="cell"><span className="symbol symbol--o">O</span></button>
        <button className="cell"></button>
      </div>
    </div>
  )
}

export default App
