import Headers from "../Components/Headers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "../Components/Signup";
// import Login from "./Login";
import Cards from "../Components/Cards";
import Dashboards from "../Components/Dashboards";
import Login from "../Components/Login";
import Passbook from "../Components/Passbook";

function App() {
  return (
    <Router>
      <Headers></Headers>
      <Routes>
        <Route path="/home" element={<Headers />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/dashboard" element={<Dashboards />} />
        <Route path="/passbook" element={<Passbook />} />
      </Routes>
    </Router>
  );
}

export default App;
