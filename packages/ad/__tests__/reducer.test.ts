import Reducer, { ActionTypes } from "../src/reducer";

test("Set Ad Height", () => {
  const initialState = {
    loadAd: false,
    adHeight: 0,
    padding: 0,
  };
  const nextState = Reducer(initialState, {
    type: ActionTypes.setAdHeight,
    payload: 100,
  });
  expect(nextState).toEqual({ loadAd: false, adHeight: 100, padding: 0 });
});

test("Set Load Ad", () => {
  const initialState = {
    loadAd: false,
    adHeight: 0,
    padding: 0,
  };
  const nextState = Reducer(initialState, {
    type: ActionTypes.setLoadAd,
    payload: true,
  });
  expect(nextState).toEqual({ loadAd: true, adHeight: 0, padding: 0 });
});

test("Set padding", () => {
  const initialState = {
    loadAd: false,
    adHeight: 0,
    padding: 0,
  };
  const nextState = Reducer(initialState, {
    type: ActionTypes.setPadding,
    payload: 20,
  });
  expect(nextState).toEqual({ loadAd: false, adHeight: 0, padding: 20 });
});

test("should throw an error if called without unknown action", () => {
  const initialState = {
    loadAd: false,
    adHeight: 0,
    padding: 0,
  };
  expect(() => {
    // @ts-ignore ignore bad type
    Reducer(initialState, { type: "unknown" });
  }).toThrow("Unknown action");
});
