class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

  get activePlayer() {
    return this.players.find((player) => player.active);
  }

  createPlayers() {
    const players = [
      new Player("Player 1", 1, "#e15258", true),
      new Player("Player 2", 2, "#e59a13"),
    ];
    return players;
  }
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeTokens.drawHTMLToken();
    this.ready = true;
  }
  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeTokens;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }

    if (targetSpace !== null) {
      const game = this;
      game.ready = false;
      activeToken.drop(targetSpace, function () {
        newGame.updateGameState(activeToken, targetSpace);
      });
    }
  }
  checkForWin(target) {
    console.log(target.token.owner);
    const owner = target.token.owner;

    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner
        ) {
          win = true;
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    return win;
  }

  switchPlayers() {
    for (let player of this.players) {
      player.active = player.active === true ? false : true;
    }
  }

  gameOver(message) {
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.style.display = "block";
    gameOverElement.textContent = message;
  }

  updateGameState(token, target) {
    target.mark(token);

    if (!this.checkForWin(target)) {
      this.switchPlayers();

      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeTokens.drawHTMLToken();
        this.ready = true;
      } else {
        this.gameOver("No more Tokens");
      }
    } else {
      this.gameOver(`${target.owner.name} wins!`);
    }
  }

  handleKeydown(e) {
    if (this.ready) {
      switch (e.key) {
        case "ArrowDown":
          this.playToken();
          console.log("CLIKED DOWN");
          break;
        case "ArrowLeft":
          this.activePlayer.activeTokens.moveLeft();
          break;
        case "ArrowRight":
          this.activePlayer.activeTokens.moveRight(this.board.columns);
          break;
      }
    }
  }
}
