import { HEIGHT, STEP, WIDTH } from "./config";
import { getAxes, getGrid } from "../../helpers/grid";
import { render } from "../../helpers/utils";
import initCanvas from "../../helpers/initCanvas";
import generateShape from "./shape";

const canvas = initCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

window.addEventListener("render", function (event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const { r1, r2, r3, r4 } = event.detail;
  render(ctx, getGrid(WIDTH, HEIGHT, STEP), getAxes(WIDTH, HEIGHT));
  render(ctx, generateShape(r1, r2, r3, r4));
});

export default canvas;
