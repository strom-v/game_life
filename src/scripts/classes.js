export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.field = this.createField();
  }

  createField() {
    return new Array(this.rows)
      .fill(false)
      .map(() => new Array(this.cols).fill(false));
  }
}
