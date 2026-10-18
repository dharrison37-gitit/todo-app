import "./styles.css";
import Mask from "./images/black-mask-212kib.svg";

import { projectController } from "./controller.js";

projectController;

const img = document.createElement("img");
img.src = Mask;
document.querySelector(".logo").appendChild(img);
