import "./styles.css";
import { appController } from "./app-controller.js";

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
  const title = formData.get("todo-title");
  appController.addTodo(title);
});

appController.renderApp();
