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

import LawyerLogin from "./components/Authentication/Lawyer/Login/LawyerLogin";

import AppointmentBooking from "./components/AppointmentBooking/AppointmentBooking";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./action/clientAction";
import {
  authenticate,
  logout,
  setRoleClient,
  setRoleProvider,
} from "./action/authAction";
import { loadProvider } from "./action/providerAction";
import Dashboard from "./components/lspDashboard/Dashboard";
import UpcommingSlots from "./components/lspDashboard/Features/UpcommingSlots";
import Pastbooking from "./components/lspDashboard/Features/Pastbooking";
import Createbooking from "./components/lspDashboard/Features/Createbooking";
import AllClients from "./components/lspDashboard/Features/AllClients";
import Payment from "./components/lspDashboard/Features/Payment";
import LspPayment from "./components/Payment/LspPayment";
export default function App() {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.user);
  const { Provider } = useSelector((state) => state.loadProviders);
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadProvider());
  }, []);

  useEffect(() => {
    if (client.success) {
      dispatch(authenticate());
      if (client.data.role && client.data.role == "Client") {
        dispatch(setRoleClient());
      }
    } else {
      dispatch(logout());
    }

    if (Provider.success) {
      dispatch(authenticate());
      if (Provider.data.role && Provider.data.role == "Provider") {
        dispatch(setRoleProvider());
      }
    }
  }, [client, Provider]);

  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/pay" element={<LspPayment />} />
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

          <Route exact path="/lawyerLogin" element={<LawyerLogin />} />
          <Route
            exact
            path="/lawyerRegistration"
            element={<LawyerRegister />}
          />
          {/* Booking */}
          {isAuthenticated && isAuthenticated ? (
            <Route
              exact
              path="/service/providerprofile/appointment/:id"
              element={<AppointmentBooking />}
            />
          ) : (
            <></>
          )}

          {role && role == "Provider" ? (
            <Route exact path="/provider/dashboard" element={<Dashboard />} />
          ) : (
            <Route exact path="/provider/dashboard" element={<LawyerLogin />} />
          )}
        </Routes>
        {/* dashboard */}

        {true ? (
          <Routes>
            <Route
              exact
              path="/provider/dashboard/upcomingslots"
              element={<UpcommingSlots />}
            />
            <Route
              exact
              path="/provider/dashboard/pastbooking"
              element={<Pastbooking />}
            />
            <Route
              exact
              path="/provider/dashboard/createbooking"
              element={<Createbooking />}
            />
            <Route
              exact
              path="/provider/dashboard/clients"
              element={<AllClients />}
            />
            <Route
              exact
              path="/provider/dashboard/payments"
              element={<Payment />}
            />
          </Routes>
        ) : (
          <></>
        )}
        {/* <Dashboard/> */}
      </Router>

      <Footer />
    </>
  );
}
