import * as React from "react";
import {Board} from "./Board";

export interface GameState {
    history: Array<{squares: Array<string|null>, xIsNext: boolean}>,
    historyStep: number,
}

export class Game extends React.Component<undefined, GameState> {
  private static winSchema = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        xIsNext: true,
      }],
      historyStep: 0,
    };
  }

  handleClick(i:number) {
    console.log(i);
    const history = this.state.history;
    const historyStep = this.state.historyStep;
    const current = history[historyStep];
    const squares = current.squares.slice();
    squares[i] = current.xIsNext? 'X' : 'O';

    const winner = Game.calculateWinner(current.squares);

    if (winner) {
      alert('Hey, this is the end.');
      return;
    }

    this.setState({
      history: this.state.history.concat({
          squares: squares,
          xIsNext: !current.xIsNext,
      }),
      historyStep: this.state.historyStep + 1
    });
  }

  static calculateWinner(s:Array<string>):string|boolean {
    let wonLine = Game.winSchema.find(el => s[el[0]] === s[el[1]] && s[el[1]] === s[el[2]] && s[el[0]] !== null);
    return wonLine? s[wonLine[0]] : false;
  }

  jumpTo(step:number) {
    this.setState({
      history: this.state.history.slice(),
      historyStep: step,
    });
  }

  render() {
    const history = this.state.history;
    const historyStep = this.state.historyStep;
    const current = history[historyStep];
    const winner = Game.calculateWinner(current.squares);

    let nextPlayer = current.xIsNext? 'X' : 'O';
    let status = winner? `Winner: ${winner}` : `Next player: ${nextPlayer}`

    const moves = history.map((step, stepIndex) => {
      const desc = stepIndex
        ? `Move #${stepIndex}`
        : `Game start`
      ;

      return(
        <li key={stepIndex}>
          <a href="#" onClick={() => this.jumpTo(stepIndex)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i:number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}