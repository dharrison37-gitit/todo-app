const todoFactory = (() => {
  let _isComplete;

  const createTodo = (title, description, dueDate, priority, notes) => {
    const id = crypto.randomUUID();
    _isComplete = false;

    return {
      id,
      title,
      description,
      dueDate: dueDate || new Date().toLocaleDateString(),
      priority,
      notes,
      completed: _isComplete,
    };
  };

  const updateTodo = (todo, updated) => ({ ...todo, ...updated });

  const toggleComplete = () => (_isComplete = !_isComplete);

  return { createTodo, updateTodo, toggleComplete };
})();

export default todoFactory;
