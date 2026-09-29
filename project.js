const projectFactory = (name) => {
  const _id = crypto.randomUUID();
  const _todos = [];
  let _name = name;

  const getName = () => _name;

  const getId = () => _id;

  const addTodo = (todo) => _todos.push(todo);

  const getTodos = () => _todos;

  const removeTodo = (todoToRemove) => _todos.filter((todo) => todo.id !== todoToRemove.id);

  return { getName, getId, addTodo, getTodos, removeTodo };
};

export default projectFactory;
