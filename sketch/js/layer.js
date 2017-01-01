import sketch from './sketch';

export default class Layer {
  constructor(numCells = 100, cellSize = 10) {
    this.numCells = numCells;
    this.cellSize = cellSize;
    this.cells = [];
    for (let i = 0; i < this.numCells; i += 1) {
      this.cells[i] = [];
      for (let j = 0; j < this.numCells; j += 1) {
        this.cells[i][j] = Math.floor(sketch.random(0, 2));
      }
    }

    sketch.fill(0);
  }

  nextLayer() {
    const result = new Layer(this.numCells, this.cellSize);
    for (let i = 0; i < result.numCells; i += 1) {
      for (let j = 0; j < result.numCells; j += 1) {
        result.cells[i][j] = this.nextCellState(i, j);
      }
    }

    return result;
  }

  draw() {
    sketch.push();
    for (let i = 0; i < this.numCells; i += 1) {
      for (let j = 0; j < this.numCells; j += 1) {
        if (this.cells[i][j]) {
          sketch.box(this.cellSize);
        }
        sketch.translate(this.cellSize, 0, 0);
      }
      sketch.translate(-this.numCells * this.cellSize, 0, this.cellSize);
    }
    sketch.pop();
  }

  nextCellState(x, y) {
    let neighhborCount = 0;
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        const xoff = (x + i + this.numCells) % this.numCells;
        const yoff = (y + j + this.numCells) % this.numCells;
        if (this.cells[xoff][yoff] && xoff !== 0 && yoff !== 0) {
          neighhborCount += 1;
        }
      }
    }

    if (neighhborCount < 2 || neighhborCount > 3) {
      return 0;
    } else if (neighhborCount === 3) {
      return 1;
    }
    return this.cells[x][y];
  }
}
