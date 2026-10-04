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
    renderApp();
  };

  const renderProjects = () => {
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

        const addButton = document.createElement("button");
        addButton.classList.add("button", "add-button");
        addButton.textContent = "Add Todo";
        activeProject.appendChild(addButton);

        addButton.addEventListener("click", () => {
          document.querySelector("#todo-dialog").showModal();
        });
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
      todoItem.setAttribute("data-id", todo.id);
      todoItem.classList.add("todo-item", "accordian-header");
      todoItem.textContent = todo.title;
      // const deleteButton = document.createElement("button");
      // deleteButton.classList.add("delete-button");
      // deleteButton.textContent = "X";
      // todoItem.appendChild(deleteButton);
      todosList.appendChild(todoItem);

      const dueDateToDate = new Date(todo.dueDate);
      const accordianContent = document.createElement("div");
      const description = document.createElement("div");
      const dueDate = document.createElement("div");
      const priority = document.createElement("div");
      const notes = document.createElement("div");

      accordianContent.classList.add("accordian-content");
      description.textContent = `Desription: ${todo.description}`;
      dueDate.textContent = `Due Date: ${dueDateToDate.toLocaleDateString()}`;
      priority.textContent = `Priority: ${todo.priority}`;
      notes.textContent = `Notes: ${todo.notes}`;

      accordianContent.appendChild(description);
      accordianContent.appendChild(dueDate);
      accordianContent.appendChild(priority);
      accordianContent.appendChild(notes);

      todosList.appendChild(accordianContent);

      todoItem.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("data-id"));

        accordianContent.classList.toggle("accordian-active");
        // if (accordianContent.style.display === "grid") {
        //   accordianContent.style.display = "none";
        // } else {
        //   accordianContent.style.display = "grid";
        // }

        console.log(todo.description, todo.dueDate, todo.priority, todo.notes);
        // do something with this todo item
        // update it... delete it... mark it completed...
      });
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
