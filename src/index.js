import "./styles.css";
import { appController } from "./app-controller.js";
import Mask from "./black-mask-212kib.svg";

const logoImage = new Image();
logoImage.src = Mask;
logoImage.classList.add("logo");
const logo = document.querySelector(".logo");
logo.appendChild(logoImage);

const projectForm = document.querySelector("#project-form");
const todoForm = document.querySelector("#todo-form");

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(projectForm);
  const name = formData.get("project-name");
  appController.addProject(name);
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(todoForm);
  const title = formData.get("title");
  const description = formData.get("description");
  const dueDate = formData.get("due-date");
  const priority = formData.get("priorities");
  const notes = formData.get("notes");

  appController.addTodo(title, description, dueDate, priority, notes);

  todoForm.reset();
  document.querySelector("#todo-dialog").close();
});
