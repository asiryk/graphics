import init from "./layout";

function initLayout() {
  const container = document.createElement("div");

  container.append(init());

  return container;
}

export function animate() {
  window.dispatchEvent(new CustomEvent("3_bezier_animate"));
}

export function turnOnDebug(e) {
  window.dispatchEvent(new CustomEvent("3_bezier_debug", { detail: { debug: e.target.checked } }));
}

export function movePivot(e) {
  const detail = {};
  if (e.target.id === "bezier_x") {
    detail.x = parseFloat(e.target.value);
  } else if (e.target.id === "bezier_y") {
    detail.y = parseFloat(e.target.value);
  } else throw new Error(`there has to be only two ids and id ${e.target.id} is wrong`);
  window.dispatchEvent(new CustomEvent("3_bezier_move_pivot", { detail }));
}

export default initLayout;
