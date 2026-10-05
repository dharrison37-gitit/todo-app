export const createTodo = ({ projectId, title, description, dueDate, priority, notes }) => {
  // API
  return {
    id: crypto.randomUUID(),
    projectId,
    title,
    description: description || "",
    dueDate: dueDate || new Date(),
    priority: priority || "low",
    notes: notes || "",
    completed: false,
  };
};
