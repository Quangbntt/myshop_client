/*
 *
 * App actions
 *
 */
import { createRoutine } from "redux-saga-routines";
import {
  BROWSE_GLOBAL_CONFIG,
  SET_AUTHENTICATED,
  LOGOUT,
  SET_ENTRY,
  SET_MQTT,
  ACTION_SELECT,
  ACTION_PROGRESS,
  ACTION_CART,
  ACTION_DEL_CART
} from "./constants";

const browseGlobalConfig = createRoutine(BROWSE_GLOBAL_CONFIG, null, {
  prefix: BROWSE_GLOBAL_CONFIG,
});
const setAuthenticated = ({ isAuthenticated, profile }) => ({
  type: SET_AUTHENTICATED,
  payload: {
    isAuthenticated,
    profile,
  },
});

const setEntry = (entry) => ({
  type: SET_ENTRY,
  payload: {
    entry,
  },
});
const logOut = () => ({
  type: LOGOUT,
});
const connectMqtt = (client) => ({
  type: SET_MQTT,
  payload: {
    client,
  },
});
const actionSelect = (dataSelect) => ({
  type: ACTION_SELECT,
  payload: {
    dataSelect,
  },
});
const actionProgress = (dataProgress) => ({
  type: ACTION_PROGRESS,
  payload: {
    dataProgress,
  },
});
const actionCart = (dataCart) => ({
  type: ACTION_CART,
  payload: {
    dataCart,
  },
});
const actionDelCart = (dataDelCart) => ({
  type: ACTION_DEL_CART,
  payload: {
    dataDelCart,
  },
});
export {
  browseGlobalConfig,
  setAuthenticated,
  logOut,
  setEntry,
  connectMqtt,
  actionSelect,
  actionProgress,
  actionCart,
  actionDelCart
};
