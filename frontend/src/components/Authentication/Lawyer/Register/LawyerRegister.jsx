import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoInput from "./ProfilePhotoInput";
import { useDispatch } from "react-redux";
import { registerProvider } from "../../../../action/providerAction";
function LawyerRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [expertise_area, setexpertise_area] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [about, setAbout] = useState("");
  const [propExp, setPropExp] = useState("");
  const [enrollementId, setenrollementId] = useState("");
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare registration data to send to backend
    const registrationData = {
      email,
      password,
      name,
      expertise_area,
      city,
      education,
      about,
      propExp,
      enrollementId,

      domain: "any",
    };

    dispatch(registerProvider(registrationData));
    navigate("/lawyerLogin");
    window.location.reload();
  };

  const handleNext = (e) => {
    e.preventDefault();
    //

    setPage(2);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    //

    setPage(1);
  };

  return (
    <div>
      <div className="container page-container">
        <div className={`page ${page === 1 ? "" : "hidden"}`}>
          <Page1
            onNext={handleNext}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
        <div className={`page ${page === 2 ? "" : "hidden"}`}>
          <Page2
            onPrev={handlePrev}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            expertise_area={expertise_area}
            setexpertise_area={setexpertise_area}
            city={city}
            setCity={setCity}
            education={education}
            setEducation={setEducation}
            about={about}
            setAbout={setAbout}
            propExp={propExp}
            setPropExp={setPropExp}
            enrollementId={enrollementId}
            setenrollementId={setenrollementId}
          />
        </div>
      </div>
    </div>
  );
}

const Page1 = ({ onNext, email, setEmail, password, setPassword }) => {
  return (
    <div className=" page-1 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md w-full rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center py-6">
          Create your Lawyer account
        </h2>
        <form className="px-8 py-6 space-y-6 " noValidate>
          <div className=" justify-between gap-12 text-center">
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field border border-gray-300 rounded-sm w-full p-1"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field border border-gray-300 rounded-sm w-full p-1"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onNext}
                  className="next-button bg-indigo-500 w-full text-white p-2 rounded-md mt-4">
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Page2 = ({
  onPrev,
  handleSubmit,
  name,
  setName,
  expertise_area,
  setexpertise_area,
  city,
  setCity,
  education,
  setEducation,
  about,
  setAbout,
  propExp,
  setPropExp,
  enrollementId,
  setenrollementId,
}) => {
  return (
    <div className=" page-2 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Additional Details
          </h2>
        </div>
        <form className=" mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="justify-center flex  w-full gap-12 text-center">
            <ProfilePhotoInput />
          </div>
          <div className="additional-details rounded-md shadow-sm -space-y-px">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="expertise_area"
                className="block text-sm font-medium text-gray-700">
                Expertise Area
              </label>
              <input
                id="expertise_area"
                name="expertise_area"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your expertise area"
                value={expertise_area}
                onChange={(e) => setexpertise_area(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="education"
                className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <input
                id="education"
                name="education"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700">
                About
              </label>
              <input
                id="about"
                name="about"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your about information"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="propExp"
                className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                id="propExp"
                name="propExp"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your experience"
                value={propExp}
                onChange={(e) => setPropExp(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="enrollementId"
                className="block text-sm font-medium text-gray-700">
                Enrollment Id
              </label>
              <input
                id="enrollementId"
                name="enrollementId"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your enrollment ID"
                value={enrollementId}
                onChange={(e) => setenrollementId(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button onClick={onPrev} className="prev-button">
              Previous
            </button>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawyerRegister;
