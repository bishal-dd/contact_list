import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditContact from "./components/EditContact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/contact" element={<Home />} />
            <Route path="/contact/edit/:id" element={<EditContact />} />
          </Route>

          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
