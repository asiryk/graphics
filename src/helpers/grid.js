import Path from "./Path";

export function getGrid(width, height, cellSize) {
  const path = new Path(1, "#6F91C4");

  for (let y = cellSize; y < height; y += cellSize) {
    path.moveTo(0, y + .5);
    path.lineTo(width, y + .5);
  }

  for (let x = cellSize; x < width; x += cellSize) {
    path.moveTo(x + .5, 0);
    path.lineTo(x + .5, height);
  }

  return path;
}

export function getAxes(width, height) {
  const path = new Path(2, "#6F91C4");
  path.moveTo(0, height / 2);
  path.lineTo(width, height / 2);

  path.moveTo(width / 2, 0);
  path.lineTo(width / 2, height);

  return path;
}
