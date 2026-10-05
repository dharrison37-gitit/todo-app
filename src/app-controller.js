import { createProject } from "./project.js";
import { createTodo } from "./todo.js";

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

  const deleteProject = (projectId) => {
    if (projectId === projects[0].id) return;

    projects = projects.filter((project) => project.id !== projectId);
    saveState();
    renderApp();
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
    saveState();
    renderTodos();
  };

  const toggleTodoCompleted = (todoId) => {
    todos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    saveState();
    renderTodos();
  };

  const updateTodo = (todoId) => {};

  const deleteTodo = (todoId) => {
    todos = todos.filter((todo) => todo.id !== todoId);
    saveState();
    renderTodos();
  };

  const renderProjects = () => {
    const activeProject = document.querySelector("#active-project");
    const projectsList = document.querySelector(".project-list");
    projectsList.textContent = "";
    activeProject.textContent = "";

    projects.forEach((project) => {
      const projectContainer = document.createElement("div");
      projectContainer.classList.add("project-container");

      const projectName = document.createElement("div");
      projectName.setAttribute("data-id", project.id);
      projectName.classList.add("project-item");
      projectName.textContent = project.name;

      const deleteProjectButton = document.createElement("button");
      deleteProjectButton.classList.add("delete");
      deleteProjectButton.textContent = "X";
      deleteProjectButton.addEventListener("click", () => {
        let response = confirm("Are you sure you want to delete?");
        if (response) deleteProject(project.id);
      });

      projectContainer.appendChild(projectName);

      if (project.name !== "Default") projectContainer.appendChild(deleteProjectButton);

      projectsList.appendChild(projectContainer);

      if (String(project.id) === String(currentProjectID)) {
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
    });
  };

  const renderTodos = () => {
    const projectTodos = todos.filter((pt) => String(pt.projectId) === String(currentProjectID));
    const todosList = document.querySelector(".todos-list");
    todosList.textContent = "";

    projectTodos.forEach((todo) => {
      const todoItemContainer = document.createElement("div");
      todoItemContainer.classList.add("todo-container");

      const todoItem = document.createElement("div");
      if (todo.completed) {
        todoItem.classList.add("completed");
      }
      todoItem.setAttribute("data-id", todo.id);
      todoItem.classList.add("todo-item", "accordian-header");
      todoItem.textContent = todo.title;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        let response = confirm("Are you sure you want to delete?");
        if (response) deleteTodo(todo.id);
      });

      todoItemContainer.appendChild(todoItem);
      todoItemContainer.appendChild(deleteButton);

      todosList.appendChild(todoItemContainer);

      const accordianContent = document.createElement("div");
      accordianContent.classList.add("accordian-content");

      const description = document.createElement("div");
      description.textContent = `Desription: ${todo.description}`;

      const dueDateToDate = new Date(todo.dueDate);
      const dueDate = document.createElement("div");
      dueDate.textContent = `Due Date: ${dueDateToDate.toLocaleDateString()}`;

      const priority = document.createElement("div");
      priority.textContent = `Priority: ${todo.priority}`;

      const notes = document.createElement("div");
      notes.textContent = `Notes: ${todo.notes}`;

      //
      // Completed Logic
      const completedToggle = document.createElement("div");
      completedToggle.classList.add("completed-container");

      const completedToggleButton = document.createElement("button");
      completedToggleButton.id = "toggle";
      completedToggleButton.textContent = "Toggle Completed";
      completedToggleButton.addEventListener("click", () => {
        toggleTodoCompleted(todo.id);
      });

      completedToggle.appendChild(completedToggleButton);

      //
      // Info show/hide
      accordianContent.appendChild(description);
      accordianContent.appendChild(dueDate);
      accordianContent.appendChild(priority);
      accordianContent.appendChild(notes);
      accordianContent.appendChild(completedToggle);

      todosList.appendChild(accordianContent);

      todoItem.addEventListener("click", () => {
        accordianContent.classList.toggle("accordian-active");
      });
    });
  };

  const renderApp = () => {
    renderProjects();
    renderTodos();
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
      defaultProjectId = projects[0].id;
    } else {
      renderApp();
    }
  };

  init();

  return { addProject, addTodo };
})();
