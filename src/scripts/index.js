import { Grid } from "./classes.js";

const baseSpeed = 500;

const size = document.getElementById("inpSize");
const speed = document.getElementById("speed");
speed.value = baseSpeed;
const interval = {
  id: null,
  val: baseSpeed,
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
  pauseGame();
  size.value = baseSize;
  start(baseSize);
  updateStartButtonState();
};
const generate = () => {
  start(Number(size.value));
};
const randomizeCells = () => {
  grid.random();
};
const changeSpeed = ({ target }) => {
  pauseGame();
  speed.value = Number(target.value);
  interval.val = Number(target.value);
  startGame();
};
const changeSize = ({ target }) => {
  if (Number(target.value) < 4) {
    size.value = 4;
  }
  if (Number(target.value) > 1000) {
    size.value = 1000;
  }
};

export const updateStartButtonState = (cells = []) => {
  const hasAlive = cells.some((cell) => cell.isAlive);
  const btns = ["btnStart", "increaseGeneration", "btnPause"];
  for (const id of btns) {
    document.getElementById(id).disabled = !hasAlive;
  }
};
export const pauseGame = () => {
  clearInterval(interval.id);
};

document.getElementById("btnGenerate").addEventListener("click", generate);
document.getElementById("btnRestart").addEventListener("click", restartGame);
document.getElementById("btnStart").addEventListener("click", startGame);
document.getElementById("btnRandom").addEventListener("click", randomizeCells);
document.getElementById("btnPause").addEventListener("click", pauseGame);
document
  .getElementById("increaseGeneration")
  .addEventListener("click", incrGeneration);
size.addEventListener("change", changeSize);
speed.addEventListener("change", changeSpeed);

start(baseSize);
