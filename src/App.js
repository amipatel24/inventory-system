import React, { useState } from "react";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ProductListPage,
  AddProductPage,
  SideBar,
  CustomerListPage,
  AddCustomerPage,
  DeletedProductListPage,
  DeletedCustomerListPage,
  TaxListPage,
  AddTaxPage,
  DeleteTaxPage,
  InvoiceListPage,
  AddInvoicePage,
  EditInvoicePage,
  CompanyInfoPage,
} from "./pages/index";
import {
  HomePageAdmin,
  AdminSideBar,
  CompanyListPage,
  UserListPage,
  UserDeleteListPage,
  AddUserPage,
} from "./pages/AdminPages/index";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
import ViewDeletedInvoiceList from "./Components/Invoice/ViewDeletedInvoice/ViewDeletedInvoiceList";
const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#519872",
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const route = [
  { path: "/", element: <HomePage /> },
  { path: "/productlist", element: <ProductListPage /> },
  { path: "/addproduct", element: <AddProductPage /> },
  { path: "/product/edit/:id", element: <AddProductPage /> },
  { path: "/customer_list", element: <CustomerListPage /> },
  { path: "/addcustomer", element: <AddCustomerPage /> },
  { path: "/customer/edit/:id", element: <AddCustomerPage /> },
  { path: "/deletedproduct", element: <DeletedProductListPage /> },
  { path: "/deletedcustomer", element: <DeletedCustomerListPage /> },
  { path: "/tax_list", element: <TaxListPage /> },
  { path: "/InvoiceList/edit/:id", element: <EditInvoicePage /> },
  { path: "/addtax", element: <AddTaxPage /> },
  { path: "/tax/edit/:id", element: <AddTaxPage /> },
  { path: "/deletedtax", element: <DeleteTaxPage /> },
  { path: "/invoice_list", element: <InvoiceListPage /> },
  { path: "/addinvoice", element: <AddInvoicePage /> },
  { path: "/viewdeletedinvoice", element: <ViewDeletedInvoiceList /> },
  { path: "/company_info", element: <CompanyInfoPage /> },
  { path: "/homepage", element: <HomePageAdmin /> },
  { path: "/companylist", element: <CompanyListPage /> },
  { path: "/company/edit/:id", element: <CompanyInfoPage /> },
  { path: "/userlist", element: <UserListPage /> },
  { path: "/userdeletelist", element: <UserDeleteListPage /> },
  { path: "/adduser", element: <AddUserPage /> },
  { path: "/user/edit/:id", element: <AddUserPage /> },
];

function App() {
  const [openManu, setOpenManu] = useState(false);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={outerTheme}>
          <Header openManu={openManu} setOpenManu={setOpenManu} />
          <Box sx={{ display: "flex" }}>
            {successLoginData?.LoginData?.role_id === 2 ||
            accessToken?.role_id === 2 ? (
              <SideBar openManu={openManu} setOpenManu={setOpenManu} />
            ) : (
              <AdminSideBar openManu={openManu} setOpenManu={setOpenManu} />
            )}
            <Main open={openManu}>
              <DrawerHeader />
              <Routes>
                {route.map((route) => {
                  return (
                    <Route path={route.path} element={route.element}></Route>
                  );
                })}
              </Routes>
            </Main>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
