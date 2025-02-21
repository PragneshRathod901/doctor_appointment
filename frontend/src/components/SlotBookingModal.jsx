import React, { useState } from "react";
import { Modal, Box, Typography, TextField } from "@mui/material";
import SlotList from "./SlotList";

const SlotBookingModal = ({ doctorId, setDoctorId, setDate, slots }) => {
  const handleClose = () => {
    setDoctorId(null);
  };
  const OnDateInputChanged = (e) => {
    e.preventDefault();
    try {
      let date = new Date(e.target.value);
      setDate(date);
    } catch (err) {}
  };
  return (
    <Modal
      open={doctorId}
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
        <TextField type="date" onChange={OnDateInputChanged}></TextField>
        <SlotList slots={slots} />
      </Box>
    </Modal>
  );
};

export default SlotBookingModal;
