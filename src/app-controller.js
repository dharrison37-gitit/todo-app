import { createProject } from "./project.js";
import { createTodo } from "./todo.js";
import { renderController } from "./render-controller.js";

export const appController = (() => {
  //
  // STATE
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let currentProjectID;

  //
  // PERSISTENCE
  const saveState = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // API
  const addProject = (name) => {
    if (projects.some((project) => project.name === name)) return;

    const newProject = createProject({ name });
    projects.push(newProject);
    saveState();
    currentProjectID = newProject.id;
    renderApp();
  };

  const updateProject = (projectId) => {};

  const deleteProject = (projectId) => {};

  const addTodo = (title, description, dueDate, priority, notes) => {
    if (!currentProjectID) return;
    const newTodo = createTodo({
      projectId: currentProjectID,
      title,
      description,
      dueDate,
      priority,
      notes,
    });
    todos.push(newTodo);
    saveState();
    renderController.renderTodos(todos, currentProjectID);
  };

  const updateTodo = (todoId) => {};

  const deleteTodo = (todoId) => {};

  const renderApp = () => {
    console.log(currentProjectID);
    renderController.renderProjects(projects, currentProjectID);
    renderController.renderTodos(todos, currentProjectID);
  };

  const initEventListeners = () => {
    const projectsList = document.querySelector(".project-list");
    projectsList.addEventListener("click", (e) => {
      const projectItem = e.target.closest(".project-item");
      if (!projectItem) return;
      currentProjectID = projectItem.getAttribute("data-id");
      renderApp();
    });
  };

  const init = () => {
    initEventListeners();
    if (projects.length === 0) {
      addProject("Default");
    } else {
      renderApp();
    }
  };

  init();

  return { addProject, addTodo, renderApp };
})();
