import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DoctorList from "./components/DoctorList";

const rootURL = process.env.REACT_APP_Backend_URL || "http://localhost:8082";

function App() {
  const [doctorsData, setDoctors] = useState();
  const [selectDoc, setDoctorId] = useState();
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
  return (
    <div>
      <DoctorList doctorsData={doctorsData} setDoctorId={setDoctorId} />
    </div>
  );
}

export default App;
