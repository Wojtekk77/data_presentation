const initialState = {
  preselectedValues: [],
  columns: [],
  activeColumns: [],
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_COLUMNS":
      return {
        ...state,
        activeColumns: action.activeColumns.sort((a, b) =>
          a.name < b.name ? -1 : Number(a.name > b.name)
        ),
      };
    case "SET_COLUMNS":
      return {
        ...state,
        columns: action.columns.map((col) => {
          return { name: col, id: col };
        }),
        preselectedValues: [{ name: "Y1", id: "Y1" }],
      };

    default:
      return state;
  }
};
