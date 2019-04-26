// Store state to Local Store.
export const loadLocalState = () => {
  try {
    const serializedState = localStorage.getItem("BookCatalogState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Can't load from local storage", err);
  }
};

export const saveLocalState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("BookCatalogState", serializedState);
  } catch (err) {
    console.log("Can't save to local storage", err);
  }
};
