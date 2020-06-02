import {PID} from "./actions"
const pidReducer = (state={}, action) => {
    if (action.type === PID) {
      // update your state
      return action.pid;
    }
    return state;
   }
   export default pidReducer;