import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  DialogContent,
  Container,
  CircularProgress,
} from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CustomerEditAction } from "../../../Store/Action/CustomerAction/index";

import UseForm from "../../EditForm/UseForm";

function AddCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;

  const CustomerEditData = useSelector((state) => state?.CustomerList);
  const Customer_data = CustomerEditData.customerEdit[0];
  console.log("Customer_data", Customer_data);

  const { customerhandleSubmit, values, errors, handleOnchange } = UseForm(
    Customer_data ? Customer_data : []
  );

  console.log(values);

  const handleCancle = () => {
    navigate("/customer_list");
  };

  useEffect(() => {
    if (id) {
      dispatch(CustomerEditAction(id));
    }
  }, [dispatch, id]);
  return (
    <div>
      {!CustomerEditData.loder || !id ? (
        Customer_data || !id ? (
          <Container fixed>
            <Header
              name={id ? "Edit Customer" : "Add Customer"}
              SearchBar={false}
            />
            <Container fixed sx={{ backgroundColor: "#EAEFF2" }}>
              <DialogContent>
                <br />
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <TextField
                      required
                      error={errors?.customer_name ? true : null}
                      name="customer_name"
                      id="outlined-Product"
                      label="Customer Name"
                      autoComplete="off"
                      defaultValue={id ? Customer_data?.customer_name : ""}
                      onChange={(e) => handleOnchange(e)}
                    />
                    <p style={{ color: "red" }}>{errors?.customer_name}</p>
                    <br />
                    <TextField
                      required
                      error={errors?.address ? true : null}
                      id="outlined-Product"
                      label="Customer Address"
                      name="address"
                      autoComplete="off"
                      type="textarea"
                      onChange={(e) => handleOnchange(e)}
                      defaultValue={id ? Customer_data?.address : ""}
                    />
                    <p style={{ color: "red" }}>{errors?.address}</p>
                    <br />
                    <TextField
                      type="text"
                      name="tin_no"
                      label="customer Tin No"
                      variant="outlined"
                      onChange={(e) => handleOnchange(e)}
                      value={values?.weight}
                      autoComplete="off"
                      defaultValue={id ? Customer_data?.tin_no : ""}
                    />
                    <br />
                    <TextField
                      error={errors?.mobile_no ? true : null}
                      required
                      type="number"
                      name="mobile_no"
                      label="Mobile No"
                      variant="outlined"
                      onChange={(e) => handleOnchange(e)}
                      value={values?.hsn}
                      autoComplete="off"
                      defaultValue={id ? Customer_data?.mobile_no : ""}
                    />
                    <p style={{ color: "red" }}>{errors?.mobile_no}</p>
                    <TextField
                      name="email"
                      id="outlined-Email"
                      label="Email id"
                      autoComplete="off"
                      onChange={(e) => handleOnchange(e)}
                      defaultValue={id ? Customer_data?.email : ""}
                    />
                  </Stack>
                </Box>
                <br />
                <br />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  {id ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={customerhandleSubmit}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={customerhandleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancle()}
                  >
                    cancel
                  </Button>
                </Stack>
                <br />
              </DialogContent>
            </Container>
          </Container>
        ) : (
          <Stack
            sx={{ color: "grey.500", height: "80vh" }}
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="success" size="5rem" />
          </Stack>
        )
      ) : (
        <Stack
          sx={{ color: "grey.500", height: "80vh" }}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="success" size="5rem" />
        </Stack>
      )}
    </div>
  );
}

export default AddCustomer;
