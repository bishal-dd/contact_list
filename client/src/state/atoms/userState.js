// userState.js
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null, // Initial value is null, indicating no signed-in user.
});
