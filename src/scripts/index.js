import { Grid } from "./classes.js";

const size = document.getElementById("inpSize");
const interval = {
  id: null,
  val: 500,
};

export const baseSize = 10;
let grid;

const start = (size) => {
  grid = new Grid(size);
  grid.render();
};
const startGame = () => {
  interval.id = setInterval(() => {
    grid.update();
  }, interval.val);
};
const incrGeneration = () => {
  clearInterval(interval.id);
  grid.update();
};
const restartGame = () => {
  stopGame();
  start(Number(size.value));
  size.value = baseSize;
};
const generate = () => {
  start(Number(size.value));
};

export const stopGame = () => {
  clearInterval(interval.id);
};

document.getElementById("btnGenerate").addEventListener("click", generate);
document.getElementById("btnRestart").addEventListener("click", restartGame);
document.getElementById("btnStart").addEventListener("click", startGame);
document.getElementById("btnStop").addEventListener("click", stopGame);
document
  .getElementById("increaseGeneration")
  .addEventListener("click", incrGeneration);

start(baseSize);
