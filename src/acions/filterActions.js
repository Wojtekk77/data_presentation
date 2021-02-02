export const activeColumnsAction = (activeColumns) => {
  return { type: "ACTIVE_COLUMNS", activeColumns };
};

export const setColumnsAction = (columns) => {
  return { type: "SET_COLUMNS", columns };
};
