import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoInput from "./ProfilePhotoInput";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { registerProvider } from "../../../../action/providerAction";

function LawyerRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [expertise_area, setExpertiseArea] = useState([]);
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [about, setAbout] = useState("");
  const [propExp, setPropExp] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!email || !password || !name || !expertise_area || !city || !education || !about || !propExp || !enrollmentId) {
      setError("Please fill in all fields.");
      return;
    }

    // Prepare registration data to send to backend
    const registrationData = {
      email,
      password,
      name,
      expertise_area:Tags,
      city,
      education,
      about,
      propExp,
      enrollmentId,
      domain: "any",
    };

    // Dispatch the registration action
    try {
      await dispatch(registerProvider(registrationData));
      navigate("/lawyerLogin");
      window.location.reload(); // Force reload to update user session
    } catch (error) {
      setError("Failed to register. Please try again.");
      console.error("Error signing up:", error);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setPage(2); // Move to the next page
  
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPage(1); // Move to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          Create your Lawyer account
        </h2>
        <div className={`page ${page === 1 ? "" : "hidden"}`}>
          <Page1 email={email} setEmail={setEmail} password={password} setPassword={setPassword} onNext={handleNext} />
        </div>
        <div className={`page ${page === 2 ? "" : "hidden"}`}>
          <Page2
            name={name}
            setName={setName}
            expertise_area={expertise_area}
            setExpertiseArea={setExpertiseArea}
            city={city}
            setCity={setCity}
            education={education}
            setEducation={setEducation}
            about={about}
            setAbout={setAbout}
            propExp={propExp}
            setPropExp={setPropExp}
            enrollmentId={enrollmentId}
            setEnrollmentId={setEnrollmentId}
            onPrev={handlePrev}
            handleSubmit={handleSubmit}
          />
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex justify-center mt-4">
          <Link to="/lawyerLogin" className="text-sm text-gray-600">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

const Page1 = ({ email, setEmail, password, setPassword, onNext }) => {
  return (
    <form onSubmit={onNext} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-md font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-md font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button className="next-button bg-indigo-500 w-full text-white p-2 rounded-md mt-4" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};

const Page2 = ({
  name,
  setName,
  expertise_area,
  setExpertiseArea,
  city,
  setCity,
  education,
  setEducation,
  about,
  setAbout,
  propExp,
  setPropExp,
  enrollmentId,
  setEnrollmentId,
  onPrev,
  handleSubmit,
}) => {
  const [Tags, setTags] = useState([]);

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (e.target.value.length > 0) {
        setTags([...Tags, e.target.value]);
      }
      // console.log(expertise_area);
      e.target.value = "";
      setExpertiseArea("")
      console.log(Tags)
    }
  };

  const removeTag = (removedTag) => {
    const newTags = Tags.filter(
      (Tag) => Tag !== removedTag
    );
    setTags(newTags);
    console.log(Tags)

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div>
        <label htmlFor="name" className="block text-md font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="expertise_area" className="block text-md font-medium text-gray-700">
          Expertise Area
        </label>
        {/* <input
          id="expertise_area"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your expertise area"
          value={expertise_area}
          onChange={(e) => setExpertiseArea(e.target.value)}
        /> */}

        <div className='m-auto  bg-indigo-100 w-full  flex flex-wrap  border border-gray-300 rounded-lg p-5'>

          <input
            id="expertise_area"
            type="text"
            required
            value={expertise_area}
            onChange={(e) => setExpertiseArea((e.target.value))}

            className='w-full py-2.5 px-3 rounded-md mb-2 bg-white'
            placeholder="Enter text and click Enter to add"
            onKeyDown={addTag}
          />
          {Tags?.map((Tag, index) => {
            return (
              <div key={index} className="flex bg-white   m-1 p-2 rounded-2xl rounded-es-2xl  ">
                <span className='mt-1'>{Tag}</span>
                <span
                  onClick={() => removeTag(Tag)}
                  className="flex items-center justify-center ml-2 cursor-pointer
 text-sm font-bold hover:text-white border-2 border-red-600 text-red-500 bg-white hover:bg-red-600 rounded-full p-1.5 ">
                  <RxCross2 />
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <label htmlFor="city" className="block text-md font-medium text-gray-700">
          City
        </label>
        <input
          id="city"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="education" className="block text-md font-medium text-gray-700">
          Education
        </label>
        <input
          id="education"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="about" className="block text-md font-medium text-gray-700">
          About
        </label>
        <input
          id="about"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your about information"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="propExp" className="block text-md font-medium text-gray-700">
          Experience
        </label>
        <input
          id="propExp"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your experience"
          value={propExp}
          onChange={(e) => setPropExp(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="enrollmentId" className="block text-md font-medium text-gray-700">
          Enrollment ID
        </label>
        <input
          id="enrollmentId"
          type="text"
          required
          className="input-field border border-gray-300 rounded-sm w-full p-1"
          placeholder="Enter your enrollment ID"
          value={enrollmentId}
          onChange={(e) => setEnrollmentId(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <button className="prev-button bg-gray-400 text-white p-2 rounded-md mt-4" onClick={onPrev}>
          Previous
        </button>
        <button className="next-button bg-indigo-500 text-white p-2 rounded-md mt-4" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default LawyerRegister;
