export enum ActionTypes {
  setAdHeight = "SET_AD_HEIGHT",
  setLoadAd = "SET_LOAD_AD",
  setPadding = "SET_PADDING",
}

type setAdHeight = {
  type: ActionTypes.setAdHeight;
  payload: number;
};

type setLoadAdAction = {
  type: ActionTypes.setLoadAd;
  payload: boolean;
};

type setPadding = {
  type: ActionTypes.setPadding;
  payload: number;
};

type ReducerActions = setAdHeight | setLoadAdAction | setPadding;

interface IState {
  loadAd: boolean;
  adHeight: number;
  padding: number;
}

const reducer = (
  state: IState,
  action: ReducerActions,
): {
  adHeight: number;
  loadAd: boolean;
  padding: number;
} => {
  console.log("Action", action);
  switch (action.type) {
    case ActionTypes.setAdHeight:
      return {
        ...state,
        adHeight: action.payload,
      };
    case ActionTypes.setLoadAd:
      return {
        ...state,
        loadAd: action.payload,
      };
    case ActionTypes.setPadding:
      return {
        ...state,
        padding: action.payload,
      };
    default:
      throw new Error("Unknow action");
  }
};

export default reducer;
