import { Grid } from "./classes.js";

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
let grid;

const start = (size) => {
  grid = new Grid(size);
  grid.render();
};

start(baseSize);

const startGame = () => {
  interval.id = setInterval(() => {
    grid.update();
  }, interval.val);
};
export const stopGame = () => {
  clearInterval(interval.id);
};
const restartGame = () => {
  stopGame();
  start(Number(size.value));
  size.value = baseSize;
};

btnGenerate.addEventListener("click", () => {
  start(Number(size.value));
});
btnRestart.addEventListener("click", restartGame);
btnStart.addEventListener("click", startGame);
btnStop.addEventListener("click", stopGame);
