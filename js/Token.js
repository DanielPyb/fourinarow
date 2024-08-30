class Token {
  constructor(index, owner) {
    this.owner = owner;
    this.id = `token-${index}-${owner.id}`;
    this.dropped = false;
  }
  drawHTMLToken() {
    const div = document.createElement("div");
    const gameBoardUnderlay = document.getElementById("game-board-underlay");
    div.setAttribute("id", this.id);
    div.setAttribute("class", "token");
    div.style.backgroundColor = this.owner.color;
    gameBoardUnderlay.appendChild(div);
  }
}
