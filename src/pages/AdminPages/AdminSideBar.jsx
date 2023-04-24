import React, { useState } from "react";
import {
  Box,
  ListItemButton,
  Divider,
  IconButton,
  Drawer,
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function AdminSideBar(props) {
  const navigate = useNavigate();

  const { openManu, setOpenManu } = props;

  const theme = useTheme();
  const [Item, setItem] = useState(localStorage?.getItem("ItemName") || "User");
  const headalClick = (text) => {
    setItem(text);
    localStorage.setItem("ItemName", text);
    switch (text) {
      case "User":
        return navigate("/userlist");

      case "Company":
        return navigate("/companylist");

      default:
        return "done";
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={openManu}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpenManu(false)}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["User", "Company"].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ backgroundColor: Item === text ? "#BEC5AD" : "" }}
              >
                <ListItemButton
                  onClick={() => {
                    headalClick(text);
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inventory2Icon /> : <ReceiptIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}

export default AdminSideBar;
