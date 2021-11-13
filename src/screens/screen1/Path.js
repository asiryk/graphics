import { circlePoint, identity, isNumber, pipe } from "../../helpers/utils";
import { HEIGHT, STEP, WIDTH } from "./config";

export default class Path extends Path2D {
  constructor({ thickness = 2, color = "black", shouldApplyLinear = true } = {}) {
    super();
    this.thickness = thickness;
    this.color = color;
    this.shouldApplyLinear = !!shouldApplyLinear;
  }

  moveTo(x, y) {
    super.moveTo(...(pipe(
      this.shouldApplyLinear ? applyLinear : identity,
      // applyProjective,
    )([x, y])));
  }

  lineTo(x, y) {
    super.lineTo(...(pipe(
      this.shouldApplyLinear ? applyLinear : identity,
      // applyProjective,
    )([x, y])));
  }

  line(pointFrom, pointTo) {
    this.moveTo(...pointFrom);
    this.lineTo(...pointTo);
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    const oneDeg = Math.PI / 180;
    for (let theta = startAngle; theta < endAngle; theta += oneDeg) {
      this.moveTo(...circlePoint(x, y, radius, theta, !anticlockwise));
      this.lineTo(...circlePoint(x, y, radius, theta + oneDeg, !anticlockwise));
    }
  }

  render(ctx) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
    ctx.stroke(this);
  }
}

function applyLinear(point) {
  return pipe(
    move,
    scale,
  )(point);
}

function move([x, y]) {
  const { dx, dy } = window.screen1.linear;
  const resX = isNumber(dx) ? dx * STEP : 0;
  const resY = isNumber(dy) ? dy * STEP : 0;
  return [x + resX, y - resY];
}

function scale([x, y]) {
  const Ox = WIDTH / 2;
  const Oy = HEIGHT / 2;
  const { scale } = window.screen1.linear;
  const resScale = isNumber(scale) ? scale : 1;
  const relativeX = (Ox - x) / STEP;
  const relativeY = (Oy - y) / STEP;
  const scaledRelativeX = relativeX * resScale;
  const scaledRelativeY = relativeY * resScale;
  return [Ox - scaledRelativeX * STEP, Oy - scaledRelativeY * STEP];
}

function rotate() {

}

function applyProjective([x, y]) {
  const { a00, a01, a02, a10, a11, a12, a20, a21, a22 } = window.screen1.projective;
  const denominator = a12 * x + a22 * y + a02; // a02 - weight
  const numeratorX = (a10 * a12 * x + a20 * a22 * y) + a00; // a00 - shift x
  const numeratorY = (a11 * a12 * x + a21 * a22 * y) - a01; // a11 - shift y
  return [numeratorX / denominator, numeratorY / denominator];
}
