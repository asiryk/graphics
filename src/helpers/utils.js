export function render(ctx, ...paths) {
  paths.forEach(path => path.render(ctx));
}

export function circlePoint(x0, y0, radius, angle, clockwise = false) {
  const direction = clockwise ? 1 : -1;
  const x = x0 + radius * Math.cos(angle);
  const y = y0 + direction * radius * Math.sin(angle);

  return [x, y];
}

export function rad(deg) {
  return deg * Math.PI / 180;
}
