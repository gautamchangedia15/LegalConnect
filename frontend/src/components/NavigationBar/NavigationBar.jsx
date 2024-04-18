import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProvider } from "../../action/providerAction";
function NavigationBar() {
  const dispatch = useDispatch();
  const [search, setsearch] = useState("");
  const inputHandler = (e) => {
    setsearch(e.target.value);
    dispatch(getProvider("", "", search));
    if (location.pathname != "/service") {
      Navigate("/service");
    }
  };

  const Navigate = useNavigate();
  return (
    <div className="flex justify-between fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10 px-4 py-2 items-center Px-10">
      <div className="flex justify-between gap-12 ">
        <Link to={"/"}>
          {" "}
          <div>Logo</div>
        </Link>
      </div>
      <div className="flex justify-between gap-4 items-center ">
        <div>
          <input
            type="text"
            className="w-[300px] bg-white h-10 border border-gray-300 rounded-md px-2 py-1"
            value={search}
            onChange={(e) => inputHandler(e)}
          />
        </div>
        <div>
          <button
            onClick={() =>
              dispatch(getProvider("", "", search)) && Navigate("/service")
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>
      <div></div>

      <div>
        <div>
          <nav>
            <ul className="flex justify-between gap-12">
              <Link to={"/service"}>
                <li>Find a service</li>
              </Link>

              <li>About</li>
              <li>Contact</li>
              <Link to={'/clientLogin'}>
              <li>Login</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
