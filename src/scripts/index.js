import { Grid, Game } from "./classes.js";

const size = document.getElementById("inpSize");
const btnGenerate = document.getElementById("btnGenerate");
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const btnRestart = document.getElementById("btnRestart");
const interval = {
  id: null,
  val: 500,
};

export const baseSize = 10;
export const baseHeight = 10;
let grid = new Grid(
  Number(size.value) || baseSize,
  Number(size.value) || baseSize,
);
let game = new Game(grid);

const start = (w, h) => {
  grid = new Grid(w, h);
  game = new Game(grid);
  game.run();
};

start(Number(size.value) || baseSize, Number(size.value) || baseSize);

const startGame = () => {
  interval.id = setInterval(() => {
    game.grid.update();
  }, interval.val);
};
export const stopGame = () => {
  clearInterval(interval.id);
};
const restartGame = () => {
  stopGame();
  start(Number(size.value) || baseSize, Number(size.value) || baseSize);
  size.value = baseSize;
};

btnGenerate.addEventListener("click", () => {
  start(Number(size.value) || baseSize, Number(size.value) || baseSize);
});
btnRestart.addEventListener("click", restartGame);
btnStart.addEventListener("click", startGame);
btnStop.addEventListener("click", stopGame);
