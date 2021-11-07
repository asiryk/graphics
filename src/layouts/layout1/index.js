import layout1 from "./layout1";

export function triggerRendering() {
  const r1 = document.getElementById("radius1").value;
  const r2 = document.getElementById("radius2").value;
  const r3 = document.getElementById("radius3").value;
  const r4 = document.getElementById("radius4").value;

  const event = new CustomEvent("render", {
    detail: {
      r1: parseFloat(r1),
      r2: parseFloat(r2),
      r3: parseFloat(r3),
      r4: parseFloat(r4),
    },
  });

  window.dispatchEvent(event);
}

export default layout1;
