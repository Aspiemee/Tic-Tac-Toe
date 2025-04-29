import './App.css'

const SYMBOL_X = 'X'
const SYMBOL_O = 'O'

function App() {
  const currentStep = SYMBOL_O

  const cells = [null, null, null, SYMBOL_O, SYMBOL_X, SYMBOL_O, null, null, null]

  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_X) return 'symbol--x'
    else if (symbol === SYMBOL_O) return 'symbol--o'
    else return ''
  }

  return (
    <div className='game'>
      <div className='game-info'>
        Ход: <span className={ `symbol ${ getSymbolClassName(currentStep) }` }>{ currentStep }</span>
      </div>
      <div className="game-field">
        {cells.map(symbol => {
          return (
            <>
              <button className='cell cell--win'>{
                symbol && <span className={ `symbol ${ getSymbolClassName(symbol) }` }>{ symbol }</span>
              }</button>
            </>
          ) 
        })}
      </div>
    </div>
  )
}

export default App
