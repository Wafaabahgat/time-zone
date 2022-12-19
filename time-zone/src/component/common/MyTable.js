import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function CommonTable({ header, style, data }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: style.head,
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "10px",
      fontWeight: 500,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => style.body);

  return (
    <TableContainer
      dir="ltr"
      className="p-2 pb-5 shadow-sim rounded-xl overflow-outo"
    >
      <Table>
        <TableHead>
          <TableRow>
            {header &&
              header?.map((e, i) => (
                <StyledTableCell
                  className="whitespace-nowrap"
                  key={i}
                  align="center"
                >
                  {e}
                </StyledTableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow sx={{ border: "0" }} key={i}>
              {row.map((r, s) => (
                <StyledTableCell
                  className="text whitespace-nowrap max-w-[150px]"
                  key={s}
                  align="center"
                >
                  {r}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
