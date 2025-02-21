import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const BookingForm = ({ openForm, setFormClose, date, docData, submit }) => {
  const [duration, setDuration] = useState("");
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");

  const handleClose = () => {
    setFormClose(null);
  };
  const submitData = (e) => {
    e.preventDefault();

    submit({ duration: duration, patientName: patientName, notes: notes });
  };
  return (
    <Modal
      open={openForm}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "16px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Booking
        </Typography>
        <form onSubmit={submitData}>
          <Typography id="docName">{docData && docData.name}</Typography>
          <Typography id="date">{date && date.toLocaleDateString()}</Typography>
          <TextField
            id="duration"
            label="Duration"
            variant="outlined"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></TextField>
          <TextField
            id="patientName"
            label="Patient Name"
            variant="outlined"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          ></TextField>
          <TextField
            id="notes"
            label="notes"
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></TextField>
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingForm;
