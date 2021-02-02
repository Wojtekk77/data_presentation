const initialState = { data: [] };

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      const alreadyIn = state.data.filter(
        (el) => el.dataName === action.dataName
      ).length;
      // console.log("alrearyIn", alreadyIn);
      if (alreadyIn) return { ...state };
      return {
        ...state,
        data: state.data.concat({
          chartData: action.data,
          dataName: action.dataName,
          columnNames: action.columnNames,
        }),
      };
    case "ACTIVE_COLUMNS":
      return {
        ...state,
      };
    default:
      return state;
  }
};
