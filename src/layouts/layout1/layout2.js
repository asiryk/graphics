const div = document.createElement("div");

{
  const nav = document.createElement("nav");
  nav.setAttribute("class", "paginate-container");
  nav.style.textAlign = "start";

  const container = document.createElement("div");
  container.setAttribute("class", "pagination");
  nav.appendChild(container);

  const prev = document.createElement("a");
  prev.innerText = "Linear";
  prev.setAttribute("class", "previous_page");
  prev.onclick = () => window.dispatchEvent(new Event("layoutLinear"));

  const next = document.createElement("a");
  next.innerText = "Affine";
  next.setAttribute("class", "next_page");
  next.setAttribute("rel", "next");
  next.onclick = () => window.dispatchEvent(new Event("layoutAffine"));

  container.append(prev, next);
  div.appendChild(nav);
}

{
  const h4 = document.createElement("h4");
  h4.innerText = "Projective Transformations";
  div.appendChild(h4);
}

export default div;
