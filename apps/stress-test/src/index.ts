import { vector3_create } from "@playground/math/vector3";

const p = document.createElement("p");
p.innerHTML = "Hello world from vite app: stress-test!";
document.body.appendChild(p);

const position = vector3_create(1);
console.log(position)