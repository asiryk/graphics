import { circlePoint } from "../../helpers/utils";

export default class Path extends Path2D {
  constructor({thickness = 2, color = "black", shouldApplyLinear = true}= {}) {
    super();
    this.thickness = thickness;
    this.color = color;
    this.shouldApplyLinear = !!shouldApplyLinear;
  }

  moveTo(x, y) {
    // todo add transformations
    super.moveTo(x, y);
  }

  lineTo(x, y) {
    // todo add transformations
    super.lineTo(x, y);
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
