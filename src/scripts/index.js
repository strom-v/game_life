import { Grid } from "./classes.js";

const size = document.getElementById("inpSize");
const interval = {
  id: null,
  val: 500,
};

export const baseSize = 30;
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
  size.value = baseSize;
  start(baseSize);
  updateStartButtonState();
};
const generate = () => {
  start(Number(size.value));
};

export const updateStartButtonState = (cells = []) => {
  const hasAlive = cells.some((cell) => cell.isAlive);
  const btns = ["btnStart", "increaseGeneration", "btnStop"];
  for (const id of btns) {
    document.getElementById(id).disabled = !hasAlive;
  }
};
export const stopGame = () => {
  clearInterval(interval.id);
};

size.addEventListener("change", ({ target }) => {
  if (Number(target.value) < 4) {
    size.value = 4;
  }
  if (Number(target.value) > 1000) {
    size.value = 1000;
  }
});
document.getElementById("btnGenerate").addEventListener("click", generate);
document.getElementById("btnRestart").addEventListener("click", restartGame);
document.getElementById("btnStart").addEventListener("click", startGame);
document.getElementById("btnStop").addEventListener("click", stopGame);
document
  .getElementById("increaseGeneration")
  .addEventListener("click", incrGeneration);

start(baseSize);
