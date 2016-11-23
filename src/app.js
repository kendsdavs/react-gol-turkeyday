const React = require('react')
const gol = require('gol-functional')

const App = React.createClass({
  getInitialState() {
    return {
      board: [
        [0,1],
        [1,1]
      ],
      sim: null
    }
  },
  componentDidMount() {
    const sim = gol({
      size: 40,
      speed: 1000,
      generate: true
    }, (board) => {
      this.setState({board})
    })
    this.setState({sim})
  },
  handleStart() {
    this.state.sim.start()
  },
  handleStop() {
    this.state.sim.stop()
  },
  toggle(row, col) {
    this.state.sim.toggle(row, col)
    let board = this.state.board
    board[row][col] === 1 ? 0 : 1
    this.setState({board})
  },
  render() {

    const td = (cell) => <td className={cell === 1 ? 'bg-yellow' : ''}
      style={{height: '60px', minWidth: '60px'}}></td>
    const tr = (row, rowIndex) => <tr>{row.map(td)}</tr>
    const cellIndex = (cell) => cell.cellIndex
    return (
      <div className="pa4">
        <header>
          <h1>Game of Life</h1>
          <div>
            <button onClick={this.handleStart}>Start</button>
            <button onClick={this.handleStop}>Stop</button>
          </div>
        </header>
        <hr />
       <main>
        <table>
          {this.state.board.map((cols, rowIndex) => {
            return (
              <tr>{cols.map((cell, colIndex) => {
                return (
                  <td onClick={this.toggle(rowIndex, colIndex)}></td>
                )
              })
              }
            </tr>
            )
          })}
        </table>
       </main>
      </div>
    )
   }
})

module.exports = App
