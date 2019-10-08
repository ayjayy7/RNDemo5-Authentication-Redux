import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://178.128.114.232/api/"
});

export const checkForExpiredToken = navigation => {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      const user = jwt_decode(token);

      console.log((user.exp - currentTime) / 60);

      if (user.exp >= currentTime) {
        setAuthToken(token);

        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

export const login = (userData, navigation) => {
  return async dispatch => {
    try {
      let response = await instance.post("login/", userData);
      let user = response.data;
      setAuthToken(user.token);
      dispatch(setCurrentUser(jwt_decode(user.token)));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signup = userData => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "http://178.128.114.232/api/register/",
        userData
      );
      let user = response.data;
      let decodedUser = jwt_decode(user.access);
      setAuthToken(user.access);
      dispatch(setCurrentUser(decodedUser));
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};
