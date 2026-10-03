import { createProject } from "./project/project.js";
import { createTodo } from "./todo/todo.js";

export const appController = (() => {
  //
  // STATE
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let currentProjectID;

  // API
  const addProject = (name) => {
    if (projects.some((project) => project.name === name)) return;

    const newProject = createProject({ name });
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    currentProjectID = newProject.id;
    // renderProjects();
    renderApp();
  };

  const renderProjects = () => {
    console.log("PROJECTS:", JSON.stringify(projects, null, 2));
    const activeProject = document.querySelector("#active-project");
    const projectsList = document.querySelector(".project-list");
    projectsList.textContent = "";

    projects.forEach((project) => {
      const projectName = document.createElement("div");
      projectName.setAttribute("data-id", project.id);
      projectName.classList.add("project-item");
      projectName.textContent = project.name;
      projectsList.appendChild(projectName);

      if (project.id === currentProjectID) {
        projectName.classList.add("active");
        activeProject.textContent = project.name;
      }

      projectName.addEventListener("click", (e) => {
        currentProjectID = e.target.getAttribute("data-id");
        renderProjects();
        renderTodos();
      });
    });
  };

  const renderTodos = () => {
    const projectTodos = todos.filter((pt) => pt.projectId === currentProjectID);
    const todosList = document.querySelector(".todos-list");
    todosList.textContent = "";

    projectTodos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      todoItem.textContent = todo.title;
      todosList.appendChild(todoItem);
    });
  };

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
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  };

  const renderApp = () => {
    addProject("Default");
    renderProjects();
    renderTodos();
  };

  return { addProject, addTodo, renderApp };
})();
