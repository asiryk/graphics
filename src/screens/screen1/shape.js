import { HEIGHT, STEP, WIDTH } from "./config";
import { circlePoint, rad } from "../../helpers/utils";
import Path from "../../helpers/Path";

const Ox = WIDTH / 2;
const Oy = HEIGHT / 2;

const path = new Path();

path.arc(Ox, Oy, 8 * STEP, rad(0), rad(360), true);
path.arc(Ox, Oy - 6 * STEP, 3 * STEP, rad(0), rad(360), true);

{
  const yT = Oy - 3 * STEP;
  const yB = Oy + 3 * STEP;
  const radius = 1 * STEP;
  path.arc(Ox, yT, radius, rad(0), rad(180), true);
  path.arc(Ox, yB, radius, rad(180), rad(360), true);
  path.line(circlePoint(Ox, yT, radius, rad(0)), circlePoint(Ox, yB, radius, rad(360)));
  path.line(circlePoint(Ox, yT, radius, rad(180)), circlePoint(Ox, yB, radius, rad(180)));
}

path.arc(Ox + 4 * STEP, Oy, 1.5 * STEP, rad(0), rad(360), true);
path.arc(Ox - 4 * STEP, Oy, 1.5 * STEP, rad(0), rad(360), true);

path.arc(Ox + 4 * STEP, Oy - 4 * STEP, 1 * STEP, rad(0), rad(360), true);
path.arc(Ox + 4 * STEP, Oy + 4 * STEP, 1 * STEP, rad(0), rad(360), true);
path.arc(Ox - 4 * STEP, Oy - 4 * STEP, 1 * STEP, rad(0), rad(360), true);
path.arc(Ox - 4 * STEP, Oy + 4 * STEP, 1 * STEP, rad(0), rad(360), true);

export default path;
