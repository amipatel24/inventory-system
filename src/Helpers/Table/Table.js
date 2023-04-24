import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
// import IconButton from "@material-ui/core/IconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const { data, headalEdit, headalDelete, hide, headalShorting, ShortingHide } =
    props;
  console.log(data, "headalEdit", Object.keys(data).length, ShortingHide);

  console.log("data======>", data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontSize: "1.25rem",
              },
            }}
          >
            {console.log("ShortingHide", ShortingHide)}
            {column?.map((data) => (
              <StyledTableCell align="center">
                {data}
                {ShortingHide === data ? (
                  <FilterListIcon
                    sx={{
                      marginBottom: "-3px",
                      marginLeft: "10px",
                      transform: "rotate(180deg)",
                    }}
                    fontSize="small"
                    onClick={() => {
                      headalShorting(data);
                    }}
                  />
                ) : ShortingHide === `D ${data}` ? (
                  <FilterListIcon
                    sx={{
                      marginBottom: "-3px",
                      marginLeft: "10px",
                    }}
                    fontSize="small"
                    onClick={() => {
                      headalShorting(data);
                    }}
                  />
                ) : (
                  <FilterListOffIcon
                    sx={{
                      marginBottom: "-3px",
                      marginLeft: "10px",
                      transform: " rotate(180deg)",
                    }}
                    fontSize="small"
                    onClick={() => {
                      headalShorting(data);
                    }}
                  />
                )}
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            index++;
            return (
              <StyledTableRow key={row.name}>
                {column.map((v) => (
                  <StyledTableCell
                    align="center"
                    sx={{
                      color:
                        row[v] === "YES"
                          ? "green"
                          : row[v] === "No".toUpperCase()
                            ? "red"
                            : "black",
                    }}
                  >
                    {row[v]}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  {!hide ? (
                    <>
                      <IconButton onClick={() => headalEdit(index)}>
                        <EditIcon style={{ color: "green" }} fontSize="17px" />
                        <Typography
                          variant="h6"
                          component="text"
                          sx={{
                            fontSize: "17px",
                            marginLeft: "5px",
                            color: "green",
                          }}
                        >
                          Edit
                        </Typography>
                      </IconButton>
                    </>
                  ) : (
                    ""
                  )}
                  <IconButton onClick={() => headalDelete(index)}>
                    <DeleteIcon style={{ color: "red" }} fontSize="17px" />

                    <Typography
                      variant="h6"
                      component="text"
                      sx={{ fontSize: "17px", marginLeft: "5px", color: "red" }}
                    >
                      Delete
                    </Typography>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
