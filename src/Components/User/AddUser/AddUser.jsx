import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, DialogContent, Container, Fab } from "@mui/material";

import Header from "../../../Helpers/Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import UseForm from "../../EditForm/UseForm";
import { useDispatch, useSelector } from "react-redux";
import { userGetByuuidAction } from "../../../Store/Action/UserAction/index";
import { CompanyInfoAction } from "../../../Store/Action/CompanyAction/index";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";

const Role = [
  {
    value: 1,
    label: "Master Admin",
  },
  {
    value: 2,
    label: "Admin",
  },
];
function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const User = useSelector((state) => state?.User);
  const CompanyInfo = useSelector((state) => state?.CompanyInfo);
  console.log("CompanyInfo", CompanyInfo.CompanyInfo);

  const CompanyListData = CompanyInfo?.CompanyInfo;
  console.log("CompanyListData", CompanyListData);

  const { id } = params;
  console.log("id==========>", id);
  const imageUploader = React.useRef(null);
  const uploadedImage = React.useRef(null);
  const [image, setImage] = React.useState(null);

  const User_data = User.UserDataByuuid;

  // const showToastMessage = () => {
  //   toast.success("Data Updata  Success  !", {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  useEffect(() => {
    if (id) {
      dispatch(userGetByuuidAction(id));
    }
    dispatch(CompanyInfoAction());
  }, [dispatch, id]);

  const { UserhandleSubmit, values, errors, handleOnchange } = UseForm(
    User_data,
    image
  );

  console.log("values", values, "valueserrorsvalues", errors);

  const handleCancle = () => {
    console.log("done");
    navigate("/userlist");
  };

  const hedalImgChage = (event) => {
    const [file] = event.target.files;

    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;

      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setImage(file);
  };
  console.log("User_data.loder", User);
  return (
    <div>
      {!User?.loder || !id ? (
        // Object.keys(User_data).length ? (
        <Container fixed>
          <Header name={id ? "Edit User" : "Add User"} SearchBar={false} />
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
                    error={errors?.name ? true : null}
                    type="text"
                    name="name"
                    id="outlined-name-text"
                    label="Name"
                    autoComplete="off"
                    defaultValue={id ? User_data?.name : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.name}</p>
                  <br />
                  <TextField
                    error={errors?.mobile_no ? true : null}
                    required
                    type="number"
                    name="mobile_no"
                    label="Mobile No"
                    defaultValue={id ? User_data.mobile_no : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.mobile_no}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.mobile_no}</p>
                  <br />
                  <TextField
                    error={errors?.company_id ? true : null}
                    id="outlined-select-currency-native"
                    select
                    name="company_id"
                    label="Company Name"
                    defaultValue="select One"
                    // defaultValue={id ? User_data.description : ""}

                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <option>Select The Company</option>
                    {CompanyListData?.map((option) => (
                      <option key={option.value} value={option.company_id}>
                        {option.company_name}
                      </option>
                    ))}
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.company_id}</p>
                  <br />
                  <TextField
                    error={errors?.role_id ? true : null}
                    id="outlined-select-currency-native-role_id"
                    select
                    name="role_id"
                    label="Role"
                    defaultValue="select One"
                    // defaultValue={id ? User_data.description : ""}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <option>Select The Role </option>
                    {Role?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <p style={{ color: "red" }}>{errors?.role_id}</p>
                  <br />
                  <TextField
                    error={errors?.address ? true : null}
                    required
                    type="textarea"
                    name="address"
                    label="address"
                    defaultValue={id ? User_data.address : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.address}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.address}</p>
                  <br />
                  <TextField
                    id="outlined-email-text"
                    label="Email"
                    name="email"
                    autoComplete="off"
                    type="text"
                    defaultValue={id ? User_data.description : ""}
                    onChange={(e) => handleOnchange(e)}
                  />
                  <p style={{ color: "red" }}>{errors?.email}</p>
                  <br />
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    type="password"
                    name="password"
                    label="Password"
                    defaultValue={id ? User_data.hsn : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <br />
                  <TextField
                    error={errors?.hsn ? true : null}
                    required
                    type="password"
                    name="confrom_password"
                    label="Confrom Password"
                    defaultValue={id ? User_data.hsn : ""}
                    variant="outlined"
                    onChange={(e) => handleOnchange(e)}
                    value={values?.hsn}
                    autoComplete="off"
                  />
                  <p style={{ color: "red" }}>{errors?.hsn}</p>
                  <br />
                  {/* <TextField
                      error={errors?.hsn ? true : null}
                      required
                      type="number"
                      name="image_src"
                      label="image"
                      defaultValue={id ? User_data.hsn : ""}
                      variant="outlined"
                      onChange={(e) => handleOnchange(e)}
                      value={values?.hsn}
                      autoComplete="off"
                    /> */}
                  <img
                    alt=""
                    ref={uploadedImage}
                    style={{
                      height: "120px",
                      width: "120px",
                      display:
                        image || User_data?.productEdit?.image_src
                          ? "flex"
                          : "none",
                    }}
                    src={
                      User_data?.productEdit?.image_src
                        ? `http://localhost:3200/${User_data?.productEdit?.image_src}`
                        : "src/"
                    }
                  />
                  <br />
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="image_src"
                      ref={imageUploader}
                      onChange={hedalImgChage}
                      type="file"
                    />

                    <Fab
                      color="secondary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddIcon /> Upload User photo
                    </Fab>
                  </label>
                  ;
                </Stack>
              </Box>
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
                    onClick={UserhandleSubmit}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={UserhandleSubmit}
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
            <ToastContainer />
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
      )}
    </div>
  );
}

export default AddUser;
