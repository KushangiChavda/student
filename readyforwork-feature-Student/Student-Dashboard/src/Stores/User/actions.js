/*
 *
 * user actions
 *
 */

import { types } from "./constants";

export function login(payload) {
  return {
    type: types.LOGIN,
    payload,
  };
}
export function logout(payload) {
  return {
    type: types.LOGOUT,
    payload,
  };
}
export function setCount(payload) {
  return {
    type: types.SET_COUNT,
    payload,
  };
}