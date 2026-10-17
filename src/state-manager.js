export const stateManager = (() => {
  //
  const PROJECT = "projects";
  const CURRENT_IDX = "currentIndex";

  const saveState = (projects) => {
    localStorage.setItem(PROJECT, JSON.stringify(projects));
  };

  const loadState = () => {
    const data = localStorage.getItem(PROJECT);

    if (data) return JSON.parse(data);
    return [];
  };

  const saveCurrentIdx = (currentIndex) => {
    localStorage.setItem(CURRENT_IDX, currentIndex);
  };

  const loadCurrentIdx = () => {
    let currentIndex = localStorage.getItem(CURRENT_IDX)
      ? parseInt(localStorage.getItem(CURRENT_IDX))
      : 0;
    return currentIndex;
  };

  return { saveState, loadState, saveCurrentIdx, loadCurrentIdx };
})();
