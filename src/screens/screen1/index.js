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
      if (isNumber(transformation[prop])) {
        window.screen1[transformationName][prop] = transformation[prop];
      } else if (!window.screen1[transformationName][prop]) {
        document.getElementById(prop).value = "";
      } else {
        document.getElementById(prop).value = window.screen1[transformationName][prop];
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
    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
  },
  linear: {
    dx: 0,
    dy: 0,
    rotX: 0,
    rotY: 0,
    angle: 0,
    scale: 0,
  },
  projective: {},
  affine: {},
};

export default canvas;
