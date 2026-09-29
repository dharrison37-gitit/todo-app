export const projectFactory = (name) => {
  const _id = crypto.randomUUID();
  let _todos = [];
  let _name = name;

  const getName = () => _name;

  const setName = (name) => (_name = name);

  const getId = () => _id;

  const addTodo = (todo) => _todos.push(todo);

  const getTodos = () => _todos;

  const updateTodo = (todo, updated) => {
    _todos = _todos.map((item) => {
      if (item.id === todo.id) {
        return { ...todo, ...updated };
      }
      return item;
    });
  };

  const removeTodo = (todoToRemove) => _todos.filter((todo) => todo.id !== todoToRemove.id);

  return { getName, setName, getId, addTodo, getTodos, updateTodo, removeTodo };
};
