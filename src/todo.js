export const createTodo = (title, description, dueDate, priority, notes) => {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate: dueDate || new Date().toLocaleDateString(),
    priority,
    notes,
    completed: false,
  };
};
