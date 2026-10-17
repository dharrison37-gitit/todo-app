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
    stateManager.saveCurrentIdx(currentProjectIndex);
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
    stateManager.saveCurrentIdx(currentProjectIndex);
    saveState();
  };

  // TODO
  const addTodo = ({ title, description, dueDate, priority, notes }) => {
    if (projects[currentProjectIndex].todos.some((t) => t.title === title)) return;

    const newTodo = createTodo({
      projectId: stateManager.loadCurrentIdx(),
      title,
      description,
      dueDate,
      priority,
      notes,
    });

    const currentProject = projects[currentProjectIndex];
    const hydratedProject = projectFactory.createProject(currentProject);

    hydratedProject.addTodo(newTodo);
    saveState();
  };

  const updateTodo = (todoToUpdateId, updatedTodo) => {
    const currentProject = projects[stateManager.loadCurrentIdx()];
    // const currentProjectTodos = projects[stateManager.loadCurrentIdx()].todos;

    const updated = currentProject.todos.map((todo) =>
      todo.id === todoToUpdateId ? { ...todo, ...updatedTodo } : todo
    );

    currentProject.todos = updated;
    saveState();
  };

  const deleteTodo = (todoIdx) => {
    const currentProject = projects[stateManager.loadCurrentIdx()];
    currentProject.todos = currentProject.todos.filter((todo) => todo.id !== todoIdx);
    saveState();
  };

  const toggleCompleted = (todoId) => {
    let todos = projects[stateManager.loadCurrentIdx()].todos;
    const todoToToggle = todos.filter((todo) => todo.id === todoId);

    const toggledTodo = createTodo({ id: todoId, ...todoToToggle[0] });
    toggledTodo.toggleComplete();

    console.log(toggledTodo.completed);

    updateTodo(todoId, toggledTodo);
  };

  const saveState = () => {
    stateManager.saveState(projects);
    window.location.reload();
    renderApp();
  };

  const renderApp = () => {
    projectRenderer.render();
  };

  const initApp = () => {
    currentProjectIndex = stateManager.loadCurrentIdx();
    if (projects.length === 0) {
      addProject(DEFAULT);
    }
    renderApp();
  };

  initApp();

  return {
    addProject,
    updateProject,
    deleteProject,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleCompleted,
  };
})();
