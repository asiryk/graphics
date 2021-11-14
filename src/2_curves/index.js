import initScreen from "../2_curves/screen";
import initLayout from "../2_curves/layout";

let layout;
let screen;

export default function curves() {
  screen = !screen ? initScreen() : screen;
  layout = !layout ? initLayout() : layout;
  document.querySelector("#left-pan").appendChild(layout);
  document.querySelector("#content").appendChild(screen);
}
