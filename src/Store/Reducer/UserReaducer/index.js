import {
  USER_LIST,
  USER_DELTE_LIST,
  USER_DELETE,
  USER_ADD,
  USER_GET_BY_UUID,
  LIST_LOADER,
} from "../../ActionTypes";

const initialstate = {
  UserData: [],
  UserDeleteList: [],
  UserDataByuuid: [],
  SucessMessage: [],
  ErrorMessage: [],
  loder: true,
  Loader: false,
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LIST_LOADER:
      return {
        ...state,
        UserData: action.payload,
        Loader: true,
      };
    case USER_LIST:
      return {
        ...state,
        UserData: action.payload,
        UserDataByuuid: [],
        SucessMessage: [],
        ErrorMessage: [],
        loder: true,
        Loader: false,
      };
    case USER_DELTE_LIST:
      return {
        ...state,
        UserDeleteList: action.payload,
        Loader: false,
        loder: false,
      };
    case USER_ADD:
      return {
        ...state,
        SucessMessage: action.payload,
      };
    case USER_GET_BY_UUID:
      return {
        ...state,
        UserDataByuuid: action.payload,
        loder: false,
      };
    case USER_DELETE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
