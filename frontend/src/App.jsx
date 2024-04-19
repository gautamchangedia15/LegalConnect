import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home/Home";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Footer } from "./components/Footer/Footer";
import ServicePage from "./components/ServicePage/ServicePage";
import LawyerProfile from "./components/LawyerProfile/LawyerProfile";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ClientLogin from "./components/Authentication/Client/Login/ClientLogin";
import ClientRegistration from "./components/Authentication/Client/Register/ClientRegistration";
import LawyerRegister from "./components/Authentication/Lawyer/Register/LawyerRegister";
import AdditionalDetailsPage from "./components/Authentication/Lawyer/Register/AdditionalDetailsPage";
import LawyerLogin from "./components/Authentication/Lawyer/Login/LawyerLogin";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./action/clientAction";
import { authenticate, logout } from "./action/authAction";
export default function App() {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.user);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (client.success) {
      dispatch(authenticate());
    } else {
      dispatch(logout());
    }
  }, [client]);

  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/service" element={<ServicePage />} />
          <Route
            exact
            path="/service/providerprofile/:id"
            element={<LawyerProfile />}
          />
          {/* Authentication */}
          {/* Client */}
          <Route exact path="/clientLogin" element={<ClientLogin />} />
          <Route
            exact
            path="/clientRegistration"
            element={<ClientRegistration />}
          />
          {/* Lawyer */}
          <Route
            exact
            path="/additional-details"
            element={<AdditionalDetailsPage />}
          />
          <Route exact path="/lawyerLogin" element={<LawyerLogin />} />
          <Route
            exact
            path="/lawyerRegistration"
            element={<LawyerRegister />}
          />
        </Routes>
        {/* <LawyerRegister /> */}
      </Router>

      <Footer />
    </>
  );
}
