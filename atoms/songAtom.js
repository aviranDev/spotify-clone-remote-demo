import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState", //uniqueID (with respect to atomes/selectors)
  default: null, //default value(aka initial value)
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});



