export const renderController = (() => {
  const renderProjects = (projects, currentProjectID) => {
    const activeProject = document.querySelector("#active-project");
    const projectsList = document.querySelector(".project-list");
    projectsList.textContent = "";
    activeProject.textContent = "";

    projects.forEach((project) => {
      const projectName = document.createElement("div");
      projectName.setAttribute("data-id", project.id);
      projectName.classList.add("project-item");
      projectName.textContent = project.name;
      projectsList.appendChild(projectName);

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

  const renderTodos = (todos, currentProjectID) => {
    const projectTodos = todos.filter((pt) => String(pt.projectId) === String(currentProjectID));
    const todosList = document.querySelector(".todos-list");
    todosList.textContent = "";

    projectTodos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.setAttribute("data-id", todo.id);
      todoItem.classList.add("todo-item", "accordian-header");
      todoItem.textContent = todo.title;
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

      todoItem.addEventListener("click", () => {
        accordianContent.classList.toggle("accordian-active");
      });
    });
  };

  return { renderProjects, renderTodos };
})();
