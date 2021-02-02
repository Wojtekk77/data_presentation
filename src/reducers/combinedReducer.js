import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { dataReducer } from "./dataReducer";
import { filterReducer } from "./filterReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  filter: filterReducer,
});
