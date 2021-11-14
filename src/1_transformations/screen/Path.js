import { circlePoint, identity, pipe, rad, rotatePoint } from "../../helpers/utils";
import { HEIGHT, STEP, WIDTH } from "./config";

const Ox = WIDTH / 2;
const Oy = HEIGHT / 2;

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
      applyProjective,
      applyAffine,
    )([x, y])));
  }

  lineTo(x, y) {
    super.lineTo(...(pipe(
      this.shouldApplyLinear ? applyLinear : identity,
      applyProjective,
      applyAffine,
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
    rotate,
    scale,
  )(point);
}

function applyProjective([x, y]) {
  const { a00, a01, a02, a10, a11, a12, a20, a21, a22 } = window.screen1.projective;
  const denominator = a12 * x + a22 * y + a02; // a02 - weight
  const numeratorX = (a10 * a12 * x + a20 * a22 * y) + a00; // a00 - shift x
  const numeratorY = (a11 * a12 * x + a21 * a22 * y) - a01; // a11 - shift y
  return [numeratorX / denominator, numeratorY / denominator];
}

function applyAffine([x, y]) {
  const { a, b, c, d, e, f } = window.screen1.affine;
  const x1 = a * x - b * y + c * STEP;
  const y1 = -d * x + e * y - f * STEP;
  return [x1, y1];
}

function move([x, y]) {
  const { dx, dy } = window.screen1.linear;
  return [x + dx * STEP, y - dy * STEP];
}

function scale([x, y]) {
  let { scale } = window.screen1.linear;
  const [relX, relY] = getRelativePoint([x, y]);
  return getAbsolutePoint([relX * scale, relY * scale]);
}

function rotate(point) {
  const { rotX, rotY, angle } = window.screen1.linear;
  return getAbsolutePoint(
    rotatePoint(getRelativePoint(point), [rotX, rotY], rad(angle)));
}

function getRelativePoint([x, y]) {
  return [(x - Ox) / STEP, (Oy - y) / STEP];
}

function getAbsolutePoint([x, y]) {
  return [Ox + x * STEP, Oy - y * STEP];
}
