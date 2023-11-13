import { updateStartButtonState, stopGame } from "./index.js";

let cells = [];
const createEl = (className = "") => {
  const el = document.createElement("div");
  el.classList.add(className);
  return el;
};
const getCells = (w, h) => {
  cells = new Array(w * h)
    .fill(null)
    .map((_, index) => new Cell(index % w, Math.floor(index / w), w));
};
const getCell = (x, y, w) => {
  return cells[y * w + x];
};

export class Grid {
  constructor(size, root = "root") {
    this.size = size;
    this.cells = getCells(size, size);
    this.root = document.getElementById(root);
  }
  update() {
    const newStates = new Array(cells.length);
    let aliveCells = 0;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const aliveNeighbors = cell.countAliveNeighbors();
      if (cell.isAlive) {
        newStates[i] = aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        newStates[i] = aliveNeighbors === 3;
      }
      if (newStates[i]) aliveCells++;
    }
    for (let i = 0; i < cells.length; i++) {
      cells[i].isAlive = newStates[i];
      cells[i].el.classList.toggle("alive", newStates[i]);
    }
    if (aliveCells === 0) {
      stopGame();
      updateStartButtonState();
      alert("Цивилизация погибла");
    }
  }
  render() {
    this.root.innerHTML = null;
    const wrapper = createEl("wrapper");
    for (let y = 0; y < this.size; y++) {
      const row = createEl("row");
      for (let x = 0; x < this.size; x++) {
        const cell = getCell(x, y, this.size);
        row.appendChild(cell.el);
      }
      wrapper.appendChild(row);
    }
    this.root.appendChild(wrapper);
  }
}

class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.isAlive = false;
    this.el = createEl("cell");
    this.el.addEventListener("click", (event) => {
      const cell = getCell(x, y, size);
      cell.toggleState(cell);
      updateStartButtonState(cells);
    });
    this.setNeighbors(size);
  }
  setNeighbors(size) {
    this.neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        let neighborX = (this.x + i + size) % size;
        let neighborY = (this.y + j + size) % size;
        this.neighbors.push(neighborY * size + neighborX);
      }
    }
  }
  countAliveNeighbors() {
    return this.neighbors.reduce(
      (acc, i) => acc + (cells[i].isAlive ? 1 : 0),
      0,
    );
  }
  toggleState(cell) {
    cell.isAlive = !cell.isAlive;
    if (cell.isAlive) cell.el.classList.add("alive");
    else cell.el.classList.remove("alive");
  }
}
