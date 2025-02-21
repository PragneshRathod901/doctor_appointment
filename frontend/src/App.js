import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DoctorList from "./components/DoctorList";
import SlotBookingModal from "./components/SlotBookingModal";

const rootURL = process.env.REACT_APP_Backend_URL || "http://localhost:8082";

function App() {
  const [doctorsData, setDoctors] = useState();
  const [selectDoc, setDoctorId] = useState();
  const [selectDate, setDate] = useState();
  const [slots, setSlots] = useState();

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
            selectDoc +
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
        slots={slots}
      />
    </div>
  );
}

export default App;
