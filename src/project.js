export const projectFactory = (() => {
  const createProject = (data = {}) => {
    // state
    const state = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name ?? "Default",
      todos: data.todos ?? [],
    };

    // API
    return {
      get id() {
        return state.id;
      },
      get name() {
        return state.name;
      },
      get todos() {
        return state.todos;
      },
      addTodo(todo) {
        state.todos.push(todo);
        console.log(`Added todo: ${todo}`);
      },
      toSaveFormat() {
        return {
          id: state.id,
          name: state.name,
          todos: state.todos,
        };
      },
    };
  };
  return { createProject };
})();
