export function drawGrid(width, height, cellSize, path) {
  for (let y = cellSize; y < height; y += cellSize) {
    path.moveTo(0, y + .5);
    path.lineTo(width, y + .5);
  }

  for (let x = cellSize; x < width; x += cellSize) {
    path.moveTo(x + .5, 0);
    path.lineTo(x + .5, height);
  }

  path.closePath()
  return path;
}

export function drawAxes(width, height, path) {
  path.moveTo(0, height / 2);
  path.lineTo(width, height / 2);

  path.moveTo(width / 2, 0);
  path.lineTo(width / 2, height);

  path.closePath()
  return path;
}
