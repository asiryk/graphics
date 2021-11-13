import image from "./image";
import layout1 from "./layout1";
import layout2 from "./layout2";
import layout3 from "./layout3";

export function triggerRendering() {
  const r1 = document.getElementById("r1").value;
  const r2 = document.getElementById("r2").value;
  const r3 = document.getElementById("r3").value;
  const r4 = document.getElementById("r4").value;
  const dx = document.getElementById("dx").value;
  const dy = document.getElementById("dy").value;
  const rotX = document.getElementById("rotX").value;
  const rotY = document.getElementById("rotY").value;
  const angle = document.getElementById("angle").value;
  const scale = document.getElementById("scale").value;

  const event = new CustomEvent("renderScreen1", {
    detail: {
      dimensions: {
        r1: parseFloat(r1),
        r2: parseFloat(r2),
        r3: parseFloat(r3),
        r4: parseFloat(r4),
      },
      linear: {
        dx: parseFloat(dx),
        dy: parseFloat(dy),
        rotX: parseFloat(rotX),
        rotY: parseFloat(rotY),
        angle: parseFloat(angle),
        scale: parseFloat(scale),
      },
      projective: {},
      affine: {},
    },
  });

  window.dispatchEvent(event);
}

const container = document.createElement("div");
container.style.display = "flex";
container.style.height = "100%";
container.style.flexDirection = "column";
container.append(layout1);

const div = document.createElement("div");
const img = document.createElement("img");
img.style.width = "100%";
img.setAttribute("src", image);
div.appendChild(img);
div.style.marginTop = "auto";
container.appendChild(div);

window.addEventListener("layoutLinear", () => {
  container.innerHTML = "";
  container.append(layout1);
  container.append(div);
});

window.addEventListener("layoutProjective", () => {
  container.innerHTML = "";
  container.append(layout2);
  container.append(div);
});

window.addEventListener("layoutAffine", () => {
  container.innerHTML = "";
  container.append(layout3);
  container.append(div);
});

export default container;
