import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  DialogContent,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import UseForm from "../../EditForm/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { TaxEditAction } from "../../../Store/Action/TaxAction/index";

function AddTax() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const TaxData = useSelector((state) => state?.TaxData);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const { id } = params;
  const Tax_data = TaxData?.TaxEdit;
  console.log("Tax_data======>", Tax_data);
  const accessToken = JSON.parse(window.localStorage.getItem("LoginData"));
  const accessTokenData =
    successLoginData?.LoginData?.accessToken || accessToken?.accessToken;

  useEffect(() => {
    if (id) {
      dispatch(TaxEditAction(id));
    }
  }, [accessTokenData, dispatch, id, successLoginData.LoginData.accessToken]);

  const { TaxhandleSubmit, values, errors, handleOnchange } = UseForm(
    Tax_data[0] ? Tax_data[0] : []
  );

  const handleCancle = () => {
    console.log("done");
    navigate("/tax_list");
    // window.location.reload();
  };

  return (
    <div>
      {!TaxData.loder || !id ? (
        Tax_data?.length || !id ? (
          // Object.keys(Product_data).length ? (
          <Container fixed>
            <Header name={id ? "Edit Tax" : "Add Tax"} SearchBar={false} />
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
                      error={errors?.tax_name ? true : null}
                      name="tax_name"
                      id="outlined-Product"
                      label="Tax Name"
                      autoComplete="off"
                      defaultValue={id ? TaxData?.TaxEdit[0]?.tax_name : ""}
                      onChange={(e) => handleOnchange(e)}
                    />
                    <p style={{ color: "red" }}>{errors?.tax_name}</p>
                    <br />
                    <TextField
                      error={errors?.tax_rate ? true : null}
                      required
                      type="number"
                      name="tax_rate"
                      label="Tax Rate [ In % ]"
                      defaultValue={id ? TaxData?.TaxEdit[0]?.tax_rate : ""}
                      variant="outlined"
                      onChange={(e) => handleOnchange(e)}
                      value={values?.tax_rate}
                      autoComplete="off"
                    />
                    <p style={{ color: "red" }}>{errors?.tax_rate}</p>

                    <br />
                    <TextField
                      required
                      error={errors?.tax_country ? true : null}
                      name="tax_country"
                      id="outlined-Product"
                      label="Tax Country"
                      autoComplete="off"
                      defaultValue={id ? TaxData?.TaxEdit[0]?.tax_country : ""}
                      onChange={(e) => handleOnchange(e)}
                    />
                    <p style={{ color: "red" }}>{errors?.tax_country}</p>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Active
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="isactive"
                        defaultValue={id ? TaxData?.TaxEdit[0]?.isactive : "NO"}
                        onChange={(e) => handleOnchange(e)}
                      >
                        <FormControlLabel
                          value="YES"
                          control={<Radio />}
                          label="YES"
                        />
                        <FormControlLabel
                          value="NO"
                          control={<Radio />}
                          label="NO"
                        />
                      </RadioGroup>
                    </FormControl>
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
                      onClick={TaxhandleSubmit}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={TaxhandleSubmit}
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

export default AddTax;
