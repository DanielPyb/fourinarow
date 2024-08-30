const newGame = new Game();
const startBtn = document.querySelector("#begin-game");

startBtn.addEventListener("click", () => {
  newGame.startGame();
  startBtn.style.display = "none";
  document.getElementById("play-area").style.opacity = "1";
});
