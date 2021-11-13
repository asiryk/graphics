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

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

export function pipe(...fns) {
  return function piped(result) {
    const list = [...fns];

    while (list.length > 0) {
      // take the first function from the list
      // and execute it
      result = list.shift()(result);
    }

    return result;
  };
}

export function identity(x) {
  return x;
}
