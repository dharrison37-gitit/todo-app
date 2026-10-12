export const createTodo = (data = {}) => {
  // state
  const state = {
    projectId: data.projectId,
    id: data.id ?? crypto.randomUUID(),
    title: data.title ?? "No Title Given",
    description: data.description ?? "None description given.",
    dueDate: data.dueDate ?? new Date(),
    priority: data.priority ?? "low",
    notes: data.notes ?? "No notes given",
    completed: false,
  };

  // API
  return {
    get projectId() {
      return state.projectId;
    },
    get id() {
      return state.id;
    },
    get title() {
      return state.title;
    },
    get description() {
      return state.description;
    },
    get dueDate() {
      return state.dueDate;
    },
    get priority() {
      return state.priority;
    },
    get notes() {
      return state.notes;
    },
    get completed() {
      return state.completed;
    },
    toggleComplete() {
      state.completed = !state.completed;
    },
    toSaveFormat() {
      return {
        projectId: state.projectId,
        title: state.title,
        description: state.description,
        dueDate: state.dueDate,
        priority: state.priority,
        notes: state.notes,
        completed: state.completed,
      };
    },
  };
};
