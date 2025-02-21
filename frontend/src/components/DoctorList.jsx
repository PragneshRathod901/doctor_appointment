import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const DoctorList = ({ doctorsData, setDoctorId }) => {
  const addDoubleDigit = (min) => (min <= 9 ? "0" + min : min);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Doctor Name</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctorsData &&
            doctorsData.map((doc) => (
              <TableRow
                key={doc.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {doc.name}
                </TableCell>
                <TableCell align="right">
                  {doc.workingHours.startHH +
                    " : " +
                    addDoubleDigit(doc.workingHours.startMM)}
                </TableCell>
                <TableCell align="right">
                  {doc.workingHours.endHH +
                    " : " +
                    addDoubleDigit(doc.workingHours.endMM)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() =>
                      setDoctorId({ id: doc["_id"], name: doc.name })
                    }
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

export default DoctorList;
