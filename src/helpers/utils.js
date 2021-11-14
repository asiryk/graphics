export function render(ctx, ...paths) {
  paths.forEach(path => path.render(ctx));
}

export function circlePoint(x0, y0, radius, angle, clockwise = false) {
  const direction = clockwise ? 1 : -1;
  const x = x0 + radius * Math.cos(angle);
  const y = y0 + direction * radius * Math.sin(angle);

  return [x, y];
}

/**
 * Rotate [x, y] around [cx, cy]
 */
export function rotatePoint([x, y], [cx, cy], angle, clockwise = false) {
  angle *= clockwise ? 1 : -1;
  if (angle === 0) return [x, y];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

export function rad(deg) {
  return deg * Math.PI / 180;
}

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

export function pipe(...fns) {
  return function piped(result) {
    const list = [...fns];

    while (list.length > 0) {
      result = list.shift()(result);
    }

    return result;
  };
}

export function identity(x) {
  return x;
}

export function getRelativePoint(Ox, Oy, step) {
  return function (x, y) {
    return [(x - Ox) / step, (Oy - y) / step];
  }
}

export function getAbsolutePoint(Ox, Oy, step) {
  return function (x, y) {
    return [Ox + x * step, Oy - y * step];
  }
}
