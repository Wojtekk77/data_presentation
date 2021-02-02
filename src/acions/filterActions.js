export const activeColumnsAction = (activeColumns) => {
  return { type: "ACTIVE_COLUMNS", activeColumns };
};

export const setColumnsAction = (columns) => {
  console.log("columns in action", columns);
  return { type: "SET_COLUMNS", columns };
};
