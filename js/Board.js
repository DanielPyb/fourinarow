class Board {
  constructor() {
    this.rows = 7;
    this.columns = 6;
    this.spaces = this.createSpaces();
  }
  createSpaces() {
    const spaces = [];
    for (let i = 0; i < this.rows; i++) {
      const column = [];
      for (let j = 0; j < this.columns; j++) {
        const space = new Space(i, j);
        column.push(space);
      }
      spaces.push(column);
    }
    return spaces;
  }
  drawHTMLBoard() {
    for (let column of this.spaces) {
      for (let space of column) {
        space.drawSVGSpace();
      }
    }
  }
}
