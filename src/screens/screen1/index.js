import { HEIGHT, STEP, WIDTH } from "./config";
import { getAxes, getGrid } from "./grid";
import { isNumber, render } from "../../helpers/utils";
import initCanvas from "../../helpers/initCanvas";
import generateShape from "./shape";

const canvas = initCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleGlobals({ ...transformations }) {
  for (const transformationName in transformations) {
    const transformation = transformations[transformationName];
    for (const prop in transformation) {
      const input = document.getElementById(prop);
      if (isNumber(transformation[prop])) {
        window.screen1[transformationName][prop] = transformation[prop];
      } else if (!isNumber(window.screen1[transformationName][prop])) {
        if (input) input.value = "";
      } else {
        if (input) input.value = window.screen1[transformationName][prop];
      }
    }
  }
}

window.addEventListener("renderScreen1", event => {
  clearCanvas();
  const dimensions = event.detail.dimensions;
  const linear = event.detail.linear;
  const projective = event.detail.projective;
  const affine = event.detail.affine;

  handleGlobals({ dimensions, linear, projective, affine });

  let { r1, r2, r3, r4 } = window.screen1.dimensions;

  render(ctx, getGrid(WIDTH, HEIGHT, STEP), getAxes(WIDTH, HEIGHT));
  render(ctx, generateShape(r1, r2, r3, r4));
});

window.screen1 = {
  dimensions: {
    r1: 4,
    r2: 3,
    r3: 1,
    r4: 1.5,
  },
  linear: {
    dx: 0,
    dy: 0,
    rotX: 0,
    rotY: 0,
    angle: 0,
    scale: 1,
  },
  projective: {
    a00: 0, a01: 0, a02: 50000,
    a10: 50000, a11: 0, a12: 1,
    a20: 0, a21: 50000, a22: 1,
  },
  affine: { a: 1, b: 0, c: 0, d: 0, e: 1, f: 0 },
};

export default canvas;
