import React, { useEffect } from "react";
import RatingStar from "../LawyerCard/Rating/RatingStar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProviderDetails } from "../../action/providerAction";
import { useNavigate } from "react-router-dom";
const LawyerProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { provider, loading } = useSelector((state) => state.providerDetails);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const clickHandler = () => {
    if (!isAuthenticated) {
      navigate("/clientLogin");
    } else {
      navigate(`/service/providerprofile/appointment/${id}`);
    }
  };
  useEffect(() => {
    dispatch(getProviderDetails(id));
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8">
          {provider ? (
            <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4 bg-gray-200 p-4 flex justify-center items-center">
                    <img
                      src="https://lawrato.com/expert_images/thumb/webp/advocate-sudershani-ray.webp"
                      alt="Lawyer Profile"
                      className="object-cover w-32 h-32 md:w-48 md:h-48 rounded-full"
                    />
                  </div>
                  <div className="md:flex-1 p-6">
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Advocate {provider.name}
                      </h1>

                      <p className="text-gray-600">10+ years of experience</p>
                    </div>
                    <div className="mb-4 flex items-center">
                      <RatingStar rating={4} totalStars={5} />
                      <span className="text-gray-500 ml-2">
                        4 out of 5 stars
                      </span>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        About Me
                      </h2>
                      <p className="text-gray-700">{provider.about}</p>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Areas of Expertise
                      </h2>
                      <div className="flex 	">
                        {" "}
                        {provider.expertise_area ? (
                          provider.expertise_area.map((item, index) => (
                            <p
                              className="text-gray-700 m-2 border-[1px] p-1 rounded border-black"
                              key={index}>
                              {item}
                            </p>
                          ))
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Education and Background
                      </h2>
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          Education
                        </h3>
                        <p className="text-gray-700">{provider.education}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          Professional Experience
                        </h3>
                        <p className="text-gray-700">{provider.propExp}</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => clickHandler()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                        Schedule Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h2>Loading</h2>
          )}
        </div>
      )}
    </>
  );
};

export default LawyerProfile;
