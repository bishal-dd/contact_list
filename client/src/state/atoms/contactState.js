// userState.js
import { atom } from "recoil";

export const contactState = atom({
  key: "contactState",
  default: [], // Initial value is null, indicating no signed-in user.
});
