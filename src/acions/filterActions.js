export const activeColumnsAction = (activeColumns) => {
  console.log("active columns in action", activeColumns);
  return { type: "ACTIVE_COLUMNS", activeColumns };
};

export const setColumnsAction = (columns) => {
  console.log("columns in action", columns);
  return { type: "SET_COLUMNS", columns };
};
