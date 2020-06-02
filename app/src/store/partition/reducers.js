import {PARTITION_LIST} from "./actions"
const initialPartiState =  []
const partitionReducer = (state=initialPartiState, action) => {
    if (action.type === PARTITION_LIST) {
      let partition = state;
      return  [...partition,  ...action.list];
    }
    return state;
   }
   export default partitionReducer;