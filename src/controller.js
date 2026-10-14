import { projectFactory } from "./project.js";
import { createTodo } from "./todo.js";
import { stateManager } from "./state-manager.js";
import { projectRenderer } from "./dom-controller.js";

export const projectController = (() => {
  //
  const DEFAULT = "Default";
  let projects = stateManager.loadState();
  let currentProjectIndex = stateManager.loadCurrentIdx();

  // PROJECT
  const addProject = (name) => {
    if (projects.some((p) => p.name === name)) return;

    const newProject = projectFactory.createProject({ name });
    const savedFormat = newProject.toSaveFormat();

    projects.push(savedFormat);
    currentProjectIndex = projects.indexOf(savedFormat);
    saveState();
  };

  const updateProject = (projectId, newName) => {
    if (!projects[projectId]) return;

    projects[projectId].name = newName;
    saveState();
  };

  const deleteProject = (projectId) => {
    if (projectId === 0) return;

    projects = projects.filter((project) => projects.indexOf(project) !== projectId);
    currentProjectIndex--;
    saveState();
  };

  // TODO
  const addTodo = (title, description, dueDate, priority, notes) => {
    if (projects[currentProjectIndex].todos.some((t) => t.title === title)) return;

    const newTodo = createTodo({
      projectId: currentProjectIndex,
      title,
      description,
      dueDate,
      priority,
      notes,
    });

    const currentProject = projects[currentProjectIndex];
    const hydratedProject = projectFactory.createProject(currentProject);

    console.log(currentProject);

    hydratedProject.addTodo(newTodo);
    saveState();
  };

  // const updateTodo = () => {};

  const deleteTodo = (todoIdx) => {
    const currentProject = projects[currentProjectIndex];
    currentProject.todos = currentProject.todos.filter((todo) => todo.id !== todoIdx);
    saveState();
  };

  const saveState = () => {
    stateManager.saveState(projects, currentProjectIndex);
    window.location.reload();
    renderApp();
  };

  const renderApp = () => {
    // FOR CONSOLE TESTING
    // console.clear();
    // if (projects)
    //   projects.forEach((p) => {
    //     console.log("PROJECT:", p.name);
    //     if (!p.todos) return;
    //     p.todos.forEach((t) => console.log("TODO:", t.title));
    //   });
    // console.log(JSON.stringify(projects, null, 2));
    //******************************************** */

    projectRenderer.render();
  };

  const initApp = () => {
    currentProjectIndex = stateManager.loadCurrentIdx();
    if (projects.length === 0) {
      addProject(DEFAULT);
      window.location.reload();
    }
    renderApp();
  };

  initApp();

  return {
    addProject,
    updateProject,
    deleteProject,
    addTodo,
    // updateTodo,
    deleteTodo,
  };
})();
