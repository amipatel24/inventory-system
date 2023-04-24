import { AUTH, AUTHFAILED } from "../../ActionTypes/index";
const initialstate = {
  LoginData: [],
  FailedLoginData: [],
};

const UserLoginReducer = (state = initialstate, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        LoginData: action.payload.data,
      };
    case AUTHFAILED:
      return {
        ...state,
        FailedLoginData: action?.payload?.data,
      };

    default:
      return state;
  }
};
export default UserLoginReducer;
