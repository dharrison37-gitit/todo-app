import { projectController } from "./controller.js";
import { stateManager } from "./state-manager.js";

export const projectRenderer = (() => {
  //
  //
  const DEFAULT = "Default";
  let projects = stateManager.loadState();
  let activeProject = stateManager.loadCurrentIdx();
  const activeProjectTitle = document.querySelector(".active-project");
  const projectForm = document.querySelector("#project-form");
  const nameInput = document.querySelector("#project-name");
  const projectBtn = document.querySelector("#project-btn");
  const addTodoButton = document.querySelector(".add-todo");

  const render = () => {
    renderProjects(projects);
    renderTodos(projects[activeProject].todos);

    renderActiveTodoTitle();

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

  const renderActiveTodoTitle = () => {
    let activeProjectName = projects[activeProject].name;
    activeProjectTitle.textContent = activeProjectName;
    const addButton = createAddButton();
    addButton.addEventListener("click", (e) => {
      const dialog = document.querySelector(".todo-dialog");
      dialog.showModal();
    });
    document.querySelector(".add-todo").appendChild(addButton);
  };

  const createAddButton = () => {
    const addButton = document.createElement("a");
    addButton.classList.add("add-button");
    addButton.href = "#";
    addButton.textContent = "Add Todo";
    addTodoButton.appendChild(addButton);

    return addButton;
  };

  // KEEP CODE FOR PROJECT TEMPLATE
  const renderProjects = (data) => {
    const template = document.getElementById("project-template");
    const container = document.getElementById("project-container");
    container.replaceChildren();

    data.forEach((project) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".project-header").setAttribute("data-id", projects.indexOf(project));

      clone.querySelector('[data-field="name"]').textContent = project.name;
      clone.querySelector(".delete-button").addEventListener("click", () => {
        projectController.deleteProject(projects.indexOf(project));
      });

      // show the delete button only if not default proejct
      if (project.name !== DEFAULT) {
        clone.querySelector("#project-delete").style.display = "block";
      }

      clone.querySelector(".project-header").addEventListener("click", (e) => {
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

        renderTodos(projects[activeProject].todos);
      });

      container.appendChild(clone);
    });
  };

  // KEEP CODE FOR TODO TEMPLATE
  const renderTodos = (data) => {
    const template = document.getElementById("todo-template");
    const container = document.getElementById("todo-container");
    container.replaceChildren();

    data.forEach((todo) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector('[data-field="title"]').textContent = todo.title;
      clone.querySelector('[data-field="description"').textContent =
        `Description: ${todo.description}`;
      clone.querySelector('[data-field="due-date"]').textContent = `Due: ${todo.dueDate}`;
      clone.querySelector('[data-field="priority"]').textContent = `Priority: ${todo.priority}`;
      clone.querySelector('[data-field="notes"]').textContent = `Notes: ${todo.notes}`;

      clone.querySelector(".delete-button").addEventListener("click", () => {
        projectController.deleteTodo(todo.id);
      });

      container.appendChild(clone);
    });
  };

  return { render };
})();
