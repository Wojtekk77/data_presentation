const initialState = {
  preselectedValues: [],
  columns: [],
  activeColumns: [],
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_COLUMNS":
      const active = action.activeColumns.some((e) => e.name === "Y1")
        ? action.activeColumns
        : action.activeColumns.concat({ name: "Y1", id: "Y1" });
      return {
        ...state,
        activeColumns: active.sort((a, b) =>
          a.name < b.name ? -1 : Number(a.name > b.name)
        ),
      };
    case "SET_COLUMNS":
      return {
        ...state,
        columns: action.columns.map((col) => {
          return { name: col, id: col };
        }),
        activeColumns: action.columns.map((e) => {
          return { name: e, id: e };
        }),
      };

    default:
      return state;
  }
};
