import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DoctorList from "./components/DoctorList";
import SlotBookingModal from "./components/SlotBookingModal";
import SlotList from "./components/SlotList";
import BookingForm from "./components/BookingForm";

const rootURL = process.env.REACT_APP_Backend_URL || "http://localhost:8082";

function App() {
  const [doctorsData, setDoctors] = useState();
  const [selectDoc, setDoctorId] = useState();
  const [selectDate, setDate] = useState();
  const [slots, setSlots] = useState();
  const [selectedSlot, setSelectedSlot] = useState();

  const SubmitAppointment = (e) => {
    const dt = new Date(selectDate);
    dt.setHours(selectedSlot.startHH);
    dt.setMinutes(selectedSlot.startMM);
    const data = {
      doctorId: selectDoc.id,
      date: dt,
      duration: e.duration,
      patientName: e.patientName,
      notes: e.notes,
    };
    axios
      .post(rootURL + "/api/appointments", data)
      .then(() => {
        alert("success");
        setDate(null);
        setSelectedSlot(null);
        setSlots(null);
        setDoctorId(null);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    axios
      .get(rootURL + "/api/doctors")
      .then((res) => {
        if (res) {
          setDoctors(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (selectDoc && selectDate) {
      axios
        .get(
          rootURL +
            "/api/doctors/" +
            selectDoc.id +
            "/slots?date=" +
            selectDate.toLocaleDateString()
        )
        .then((res) => {
          if (res) {
            setSlots(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectDate]);
  return (
    <div>
      <DoctorList doctorsData={doctorsData} setDoctorId={setDoctorId} />
      <SlotBookingModal
        doctorId={selectDoc}
        setDoctorId={setDoctorId}
        setDate={setDate}
        child={<SlotList slots={slots} openForm={setSelectedSlot} />}
      />
      <BookingForm
        openForm={selectedSlot}
        date={selectDate}
        setFormClose={setSelectedSlot}
        docData={selectDoc}
        submit={SubmitAppointment}
      />
    </div>
  );
}

export default App;
