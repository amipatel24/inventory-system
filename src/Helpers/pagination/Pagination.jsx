import React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export default function UsePagination(props) {
  const { countNumbuer, PageNumber, currentPage } = props;
  let getpageNumber = localStorage.getItem("PageNumber");
  const { items } = usePagination({
    count: countNumbuer,
    defaultPage: currentPage,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, disabled, selected, ...item }, index) => {
          let children = null;
          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                  backgroundColor: selected ? "green" : "white",
                  color: selected ? "white" : "green",
                  border: "1px solid grey",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            console.log(
              "pagetypepagetype",
              page,
              type,
              selected,
              items.length,
              disabled
            );
            children = (
              <button
                disabled={0 === page || disabled ? true : null}
                style={{
                  backgroundColor: "white",
                  padding: "6px 12px",
                  color: 0 === page || disabled ? "lightgreen" : "green",
                  border: "1px solid grey",
                  cursor: "pointer",
                }}
                type="button"
                {...item}
              >
                {type}
              </button>
            );
          }

          return (
            <li
              key={index}
              onClick={() => {
                console.log("children", page);
                PageNumber(page);
                localStorage.setItem("PageNumber", page);
              }}
            >
              {children}
            </li>
          );
        })}
      </List>
    </nav>
  );
}
