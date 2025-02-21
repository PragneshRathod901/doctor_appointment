import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const SlotList = ({ slots }) => {
  const addDoubleDigit = (min) => (min <= 9 ? "0" + min : min);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 440 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slots &&
            slots.map((doc) => (
              <TableRow
                key={doc.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  {doc.startHH + " : " + addDoubleDigit(doc.startMM)}
                </TableCell>
                <TableCell align="right">
                  {doc.endHH + " : " + addDoubleDigit(doc.endMM)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    // onClick={() => setDoctorId(doc["_id"])}
                  >
                    Book
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SlotList;
