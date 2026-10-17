import { projectController } from "./controller.js";
import { stateManager } from "./state-manager.js";

export const projectRenderer = (() => {
  //
  //
  let editingId = null;
  let projects = stateManager.loadState();

  const DEFAULT = "Default";
  const activeProjectTitle = document.querySelector(".active-project");
  const projectForm = document.querySelector("#project-form");
  const todoForm = document.querySelector("#todo-form");
  const nameInput = document.querySelector("#project-name");
  const projectButton = document.querySelector("#project-btn");
  const addTodoButton = document.querySelector(".add-todo");
  const cancelButton = document.querySelector(".cancel-btn");
  const dialog = document.querySelector(".todo-dialog");

  const render = () => {
    projects = stateManager.loadState();
    renderProjects(projects);
    renderTodos(projects[stateManager.loadCurrentIdx()].todos);
    renderActiveTodoTitle();

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(projectForm);

      if (projectButton.textContent === "Update") {
        projectController.updateProject(
          stateManager.loadCurrentIdx(),
          formData.get("project-name")
        );
      } else {
        projectController.addProject(formData.get("project-name"));
      }
      window.location.reload();
    });

    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(todoForm);

      const todo = {
        title: formData.get("title"),
        description: formData.get("description"),
        dueDate: formData.get("due"),
        priority: formData.get("priority"),
        notes: formData.get("notes"),
      };

      if (editingId !== null) {
        projectController.updateTodo(editingId, todo);
      } else {
        projectController.addTodo(todo);
      }
    });

    projects[stateManager.loadCurrentIdx()].todos.forEach((todo) => {
      if (todo.completed) {
        console.log(todo.id, "completed");
        const id = document.querySelector(`[data-id="${todo.id}"]`);
        console.log(id, "completed");
        id.classList.toggle("done");
      }
    });
  };

  const renderActiveTodoTitle = () => {
    let activeProjectName = projects[stateManager.loadCurrentIdx()].name;
    activeProjectTitle.textContent = activeProjectName;
    const addButton = createAddButton();

    addButton.addEventListener("click", () => {
      dialog.showModal();
    });
    cancelButton.addEventListener("click", () => {
      dialog.close();
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
        if (confirm("Deletion confirmation?"))
          projectController.deleteProject(projects.indexOf(project));
      });

      // Update the project name
      clone.querySelector(".update-button").addEventListener("click", () => {
        let activeProjectName = projects[stateManager.loadCurrentIdx()].name;
        activeProjectTitle.textContent = activeProjectName;

        if (activeProjectName !== DEFAULT) {
          nameInput.value = activeProjectName;
          projectButton.textContent = "Update";
        } else {
          nameInput.value = "";
          projectButton.textContent = "Create";
        }
      });

      // show the delete button only if not default proejct
      if (project.name !== DEFAULT) {
        clone.querySelector("#project-delete").style.display = "block";
      } else {
        clone.querySelector("#project-delete").style.display = "none";
      }

      if (project.name !== DEFAULT) {
        clone.querySelector("#project-update").style.display = "block";
      } else {
        clone.querySelector("#project-update").style.display = "none";
      }

      // When you select a project set active
      clone.querySelector(".project-header").addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-id");
        if (!index) return;
        stateManager.saveCurrentIdx(index);

        let activeProjectName = projects[index].name;
        activeProjectTitle.textContent = activeProjectName;

        // if (activeProjectName !== DEFAULT) {
        //   nameInput.value = activeProjectName;
        //   projectButton.textContent = "Update";
        // } else {
        //   nameInput.value = "";
        //   projectButton.textContent = "Create";
        // }

        window.location.reload();
        renderTodos(projects[stateManager.loadCurrentIdx()].todos);
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
      clone.querySelector('[data-id="0"]').setAttribute("data-id", todo.id);

      clone.querySelector('[data-field="title"]').textContent = todo.title;
      clone.querySelector('[data-field="description"]').textContent =
        `Description: ${todo.description}`;
      clone.querySelector('[data-field="due-date"]').textContent = `Due: ${todo.dueDate}`;
      clone.querySelector('[data-field="priority"]').textContent = `Priority: ${todo.priority}`;
      clone.querySelector('[data-field="notes"]').textContent = `Notes: ${todo.notes}`;

      clone.querySelector(".delete-button").addEventListener("click", () => {
        if (confirm("Deletion confirmation?")) projectController.deleteTodo(todo.id);
        renderTodos(projects[stateManager.loadCurrentIdx()].todos);
      });

      // Toogle Todo Completed
      clone.querySelector(".completed").addEventListener("click", (e) => {
        e.target.parentElement.setAttribute("data-id", todo.id);
        console.log(e.target.getAttribute("data-id"));
        projectController.toggleCompleted(todo.id);
      });

      clone.querySelector(".update-button").addEventListener("click", () => {
        editingId = todo.id;

        document.querySelector("input[name='title']").value = todo.title;
        document.querySelector("textarea[name='description'").value = todo.description;
        document.querySelector("input[name='due']").value = todo.dueDate;
        document.querySelector("select[name='priority']").value = todo.priority;
        document.querySelector("textarea[name='notes']").value = todo.notes;

        dialog.showModal();
      });

      container.appendChild(clone);
    });
  };

  return { render };
})();
