import { radii } from "../../screens/screen1/shape";
import { triggerRendering } from "./index";
import image from "./image";

const container = document.createElement("div");
container.style.display = "flex";
container.style.height = "100%";
container.style.flexDirection = "column";

{
  const div = document.createElement("div");
  div.append(
    createInputElement(1),
    createInputElement(2),
    createInputElement(3),
    createInputElement(4),
  );

  const btnDiv = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-sm btn-primary");
  button.setAttribute("type", "button");
  button.innerText = "Render";
  button.onclick = triggerRendering;
  btnDiv.appendChild(button);


  div.appendChild(btnDiv);
  container.append(div);
}

{
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.style.width = "100%";
  img.setAttribute("src", image);
  div.appendChild(img);
  div.style.marginTop = "auto";
  container.appendChild(div);
}

function createInputElement(id) {
  const container = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const $id = "radius" + id;
  input.value = radii[id - 1].toString();
  input.setAttribute("id", $id);
  input.style.margin = "2.5px 5px";
  input.setAttribute("class", "form-control input-sm");
  input.setAttribute("placeholder", "Radius " + id);
  label.setAttribute("for", $id);
  label.innerText = "Radius " + id;
  container.append(label, input);

  return container;
}

export default container;
