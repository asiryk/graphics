import { HEIGHT, STEP, WIDTH } from "./config";
import { getAxes, getGrid } from "../../helpers/grid";
import { render } from "../../helpers/utils";
import initCanvas from "../../helpers/initCanvas";
import shape from "./shape";

const canvas = initCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

render(ctx, getGrid(WIDTH, HEIGHT, STEP), getAxes(WIDTH, HEIGHT));
render(ctx, shape)

export default canvas;
