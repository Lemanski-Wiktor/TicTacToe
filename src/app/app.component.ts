import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TicTacToe';
  squares!: any[];
  chars!: string[];
  isPlayer!: boolean;
  winner!: string;
  @Input() value!: 'O' | 'X';
  public btnStartClass = 'btnStartStyle';

  constructor() {}
  ngOnInit() {
    this.newGame();
  }
  newGame() {
    this.squares = Array(9).fill(null);
    this.chars = [];
    this.winner = '';
    document.getElementById('board')!.style.pointerEvents = 'auto';
    document.getElementById('result')!.textContent = '';
  }
  makePlayerMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, 'O');
      this.chars.push('O');
      if (this.calculateWinner() == null) {
        this.makePCMove(idx);
      }
    }
    this.showResult();
  }
  makePCMove(idx: number) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    if (idx != 4 && this.squares[4] == null) {
      this.squares.splice(4, 1, 'X');
      this.chars.push('X');
      return;
    } else {
      if (this.chars.length === 1) {
        this.squares.splice(0, 1, 'X');
        this.chars.push('X');
        return;
      }

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        //
        // debugger;
        if (
          (this.squares[4] === this.squares[8] ||
            this.squares[1] === this.squares[8]) &&
          this.chars.length == 3 &&
          this.squares[8] === 'O'
        ) {
          this.squares.splice(2, 1, 'X');
          this.chars.push('X');
          return;
        } else if (
          this.squares[0] === this.squares[8] &&
          this.chars.length === 3 &&
          this.squares[0] != null
        ) {
          this.squares.splice(1, 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[0] === this.squares[7] &&
          this.chars.length === 3 &&
          this.squares[0] === 'O'
        ) {
          this.squares.splice(6, 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          (this.squares[1] === this.squares[7] ||
            this.squares[1] === this.squares[6]) &&
          this.squares[1] === 'O' &&
          this.chars.length === 3
        ) {
          this.squares.splice(0, 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[2] === this.squares[6] &&
          this.squares[2] === 'O' &&
          this.chars.length === 3 &&
          this.squares[1] == null
        ) {
          this.squares.splice(1, 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          (this.squares[3] === this.squares[8] ||
            this.squares[3] === this.squares[2] ||
            this.squares[3] === this.squares[5]) &&
          this.chars.length === 3 &&
          this.squares[0] == null &&
          this.squares[3] === 'O'
        ) {
          this.squares.splice(0, 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          (this.squares[3] === this.squares[5] ||
            this.squares[3] === this.squares[1]) &&
          this.squares[3] === this.squares[7] &&
          this.chars.length === 5 &&
          this.squares[6] == null &&
          this.squares[3] === 'O'
        ) {
          this.squares.splice(6, 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[6] === this.squares[5] &&
          this.squares[6] === 'O' &&
          this.chars.length === 3
        ) {
          this.squares.splice(8, 1, 'X');
          this.chars.push('X');
          return;
        }
        //
        if (
          this.squares[a] != null &&
          this.squares[b] != null &&
          this.squares[c] != null
        ) {
          continue;
        }
        //
        if (
          this.squares[a] === this.squares[b] &&
          this.squares[a] != null &&
          this.squares[c] === null
        ) {
          this.squares.splice(lines[i][2], 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[a] === this.squares[c] &&
          this.squares[a] != null &&
          this.squares[b] === null
        ) {
          this.squares.splice(lines[i][1], 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[c] === this.squares[b] &&
          this.squares[c] != null &&
          this.squares[a] === null
        ) {
          this.squares.splice(lines[i][0], 1, 'X');
          this.chars.push('X');
          return;
        }
      }
      // debugger;

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          this.squares[a] != null &&
          this.squares[b] != null &&
          this.squares[c] != null
        ) {
          continue;
        }
        if (
          this.squares[a] != this.squares[b] &&
          this.squares[a] == null &&
          this.squares[c] != null
        ) {
          this.squares.splice(lines[i][0], 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[a] != this.squares[c] &&
          this.squares[c] == null &&
          this.squares[b] != null
        ) {
          this.squares.splice(lines[i][2], 1, 'X');
          this.chars.push('X');
          return;
        }
        if (
          this.squares[c] != this.squares[b] &&
          this.squares[b] == null &&
          this.squares[a] != null
        ) {
          this.squares.splice(lines[i][1], 1, 'X');
          this.chars.push('X');
          return;
        }
      }
    }
  }
  showResult() {
    if (this.calculateWinner() != null) {
      this.winner = this.calculateWinner();
      document.getElementById('board')!.style.pointerEvents = 'none';
      return;
    }
    if (this.calculateWinner() == null && this.chars.length == 9) {
      document.getElementById('result')!.textContent = 'DRAW!';
      document.getElementById('board')!.style.pointerEvents = 'none';
      return;
    }
  }
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
  public setColor(value: HTMLElement) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    value.style.color = `#${randomColor}`;
  }
}
