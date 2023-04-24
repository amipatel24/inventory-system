import ProductListReducer from "./ProductListReducer/index";
import CustomerListReducer from "./CustomerListReducer/index";
// import CustomerEditReducer from "./CustomerEditReducer/index";
import UserLoginReducer from "./UserLogin/index";
import InvoiceReducer from "./InvoiceReducer/index";
import TaxReducer from "./TaxReaducer/index";
import CompanyInfoReducer from "./CompanyInfoReducer/index";
import UserReaducer from "./UserReaducer/index";

import { combineReducers } from "redux";
const RootReducer = combineReducers({
  UserLoginReducer: UserLoginReducer,
  ProductList: ProductListReducer,
  CustomerList: CustomerListReducer,
  // CustomerEdit: CustomerEditReducer,
  InvoiceData: InvoiceReducer,
  TaxData: TaxReducer,
  CompanyInfo: CompanyInfoReducer,
  User: UserReaducer,
});
export default RootReducer;
