import { projectController } from "./controller.js";
import { stateManager } from "./state-manager.js";

export const projectRenderer = (() => {
  //
  //
  const DEFAULT = "Default";
  let projects = stateManager.loadState();
  let activeProject = stateManager.loadCurrentIdx();
  const projectList = document.querySelector(".projects");
  const todoList = document.querySelector(".todos");
  const activeProjectTitle = document.querySelector(".active-project");
  const projectForm = document.querySelector("#project-form");
  const nameInput = document.querySelector("#project-name");
  const projectBtn = document.querySelector("#project-btn");
  const fragment = document.createDocumentFragment();

  const render = () => {
    projectList.replaceChildren();
    todoList.replaceChildren();

    projects.forEach((project) => {
      const container = document.createElement("div");
      container.classList.add("project-grid");

      const projectItem = createProjectElement(project);
      projectItem.setAttribute("data-id", projects.indexOf(project));
      projectItem.classList.add("project-item");

      const deleteButton = createProjectDeleteBtn();

      deleteButton.addEventListener("click", () => {
        // if (activeProject === 0) return;
        projectController.deleteProject(projects.indexOf(project));
      });

      container.appendChild(projectItem);
      if (project.name !== DEFAULT) container.appendChild(deleteButton);
      fragment.appendChild(container);
    });

    projectList.appendChild(fragment);

    projectList.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-id");
      if (!index) return;

      activeProject = index;
      stateManager.saveCurrentIdx(activeProject);

      let activeProjectName = projects[index].name;

      activeProjectTitle.textContent = activeProjectName;

      if (activeProjectName !== DEFAULT) {
        nameInput.value = activeProjectName;
        projectBtn.textContent = "Update";
      } else {
        nameInput.value = "";
        projectBtn.textContent = "Create";
      }

      // Loop over todos within clicked project and display them
      projects[index].todos.forEach((todo) => console.log(todo.title));
      displayActiveTodos(projects[index]);
    });

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(projectForm);

      if (projectBtn.textContent === "Update") {
        projectController.updateProject(activeProject, formData.get("project-name"));
      } else {
        projectController.addProject(formData.get("project-name"));
      }

      window.location.reload();
    });
  };

  const createProjectElement = (project) => {
    const item = document.createElement("div");
    item.textContent = project.name;

    return item;
  };

  const createProjectDeleteBtn = () => {
    const deleteBtn = document.createElement("a");
    deleteBtn.href = "#";
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "X";

    return deleteBtn;
  };

  const displayActiveTodos = (project) => {
    todoList.replaceChildren();

    project.todos.forEach((todo) => {
      const todoItem = createTodoElement(todo);
      todoList.appendChild(todoItem);
      console.log(todo.title);
    });
  };

  const createTodoElement = (todo) => {
    const container = document.createElement("div");
    container.classList.add("todo-container");
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.textContent = todo.title;
    container.appendChild(todoItem);
    return container;
  };

  return { render };
})();

// ********************************************************************
//
// Need to have something hold state for the current project and only
// change when new project is added or when selected in project list.
// So maybe a getState() and setState() function in a state controller
//
// ********************************************************************
