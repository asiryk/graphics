import screen1 from "./screens/screen1";
import layout1, { triggerRendering } from "./layouts/layout1";

document.querySelector("#left-pan").appendChild(layout1);
document.querySelector("#content").appendChild(screen1);

triggerRendering();
