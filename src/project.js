export const createProject = ({ name }) => {
  // API
  return {
    id: crypto.randomUUID(),
    name,
  };
};
