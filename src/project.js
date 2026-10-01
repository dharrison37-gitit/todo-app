export const createProject = (name) => {
  const _id = crypto.randomUUID();
  let _todos = [];

  // API
  return {
    name,
    getId() {
      return _id;
    },
    addTodo(todo) {
      _todos.push(todo);
    },
    getTodos() {
      return _todos;
    },
    getTodoById(todoID) {
      return _todos.find((todo) => todo.getId() === todoID);
    },
    updateTodo(todoToUpdate, updatedTodo) {
      const updatedTodos = _todos.map((todo) =>
        todo.getId() === todoToUpdate.getId() ? { ...todoToUpdate, ...updatedTodo } : todo
      );
      _todos = updatedTodos;
    },
    removeTodo(todoToRemove) {
      _todos = _todos.filter((todo) => todo.getId() !== todoToRemove.getId());
    },
    toggleCompleted(todoID) {
      const todoToToggle = _todos.find((todo) => todo.getId() === todoID);
      todoToToggle.completed = true;
    },
  };
};
