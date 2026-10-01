export const createTodo = (title, description, dueDate, priority, notes) => {
  const _id = crypto.randomUUID();
  let _completed = false;

  // API
  return {
    title,
    description,
    dueDate: dueDate || new Date(),
    priority,
    notes,
    get completed() {
      return _completed;
    },
    set completed(value) {
      _completed = value;
    },
    getId() {
      return _id;
    },
  };
};
