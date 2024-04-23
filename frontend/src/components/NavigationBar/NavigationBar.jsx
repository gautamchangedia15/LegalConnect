import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp, IoReorderThreeOutline, IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProvider } from "../../action/providerAction";
import { logoutClient } from "../../action/clientAction";
import { BsChat } from "react-icons/bs";

function NavigationBar() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);
  const [isScreenSize, setIsScreenSize] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(getProvider("", "", search));
    navigate("/service");
  };

  const handleLogout = () => {
    dispatch(logoutClient());
    navigate("/");
    window.location.reload();
  };

  const useWindowDimensions = () => {
    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null;
      const height = hasWindow ? window.innerHeight : null;
      return {
        width,
        height,
      };
    }

    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      if (hasWindow) {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, [hasWindow]);

    return windowDimensions;
  };

  const { height, width } = useWindowDimensions();
  console.log("height", height);
  console.log("width", width);
  const checkValidity = () => {
    if (width > 768) {
      return true;
    } else {
      return false;
    }
  };
  // const breakpoint = 768
  // function isbig(){
  //   if(width > breakpoint){
  //     return true
  //   }else{
  //     return false
  //   }
  // }
  useEffect(() => {
    if (width > 768) {
      setIsScreenSize(true);
    } else {
      setIsScreenSize(false);
    }
  }, [width]);

  function handleMenu() {
    setMenuOpen(!menuOpen);
  }

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {isScreenSize ? (
        <div
          className={`flex justify-between fixed top-0 left-0 right-0 h-16 ${
            role == "Provider" ? "bg-gray-50" : "bg-white"
          } shadow-sm z-10 px-4 py-2 items-center Px-10`}>
          <div className="flex justify-between gap-12 ">
            <Link to={"/"}>
              {" "}
              <div className="text-2xl font-bold ">
                <span className="text-indigo-500">Legal</span>
                <span className="text-green-800">Connect</span>
              </div>
            </Link>
          </div>

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
              dispatch(getProvider("", "", search)) && navigate("/service")
            }
            className="bg-gray-800 border border-gray-300 h-10 text-white font-bold text-xl text- px-4 py-2 rounded-md">
            <IoSearch />
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
              {role == "Provider" ? (
                <Link to={"/provider/dashboard"}>
                  <li>Dashboard</li>
                </Link>
              ) : (
                <Link to={"/client/messages"}>
                  <li> <IoChatbubbleEllipsesSharp size={20} /></li>
                  </Link>
              )}

              {role == "Client" ? (
                <Link to={"/client/myservices"}>
                  <li>My services</li>
                </Link>
              ) : (
                <></>
              )}
              <Link to={"/about"}>

                <li>About</li>
              </Link>
              <li>Contact</li>
              {isAuthenticated && isAuthenticated ? (
                <>
                  
                  <button
                    onClick={() => {
                      dispatch(logoutClient());
                      navigate("/");
                      window.location.reload();
                    }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to={"/clientLogin"}>
                    <li>Login</li>
                  </Link>
                  {role == "Provider" ? (
                    <Link to={"/provider/dashboard"}>
                      <li>Dashboard</li>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {role == "Client" ? (
                    <Link to={"/client/myservices"}>
                      <li>My services</li>
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link to={"/about"}>
                    <li>About</li>
                  </Link>
                  <li>Contact</li>
                  {isAuthenticated && isAuthenticated ? (
                    <button
                      onClick={() => {
                        dispatch(logoutClient());
                        navigate("/");
                        window.location.reload();
                      }}>
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link to={"/clientLogin"}>
                        <li>Login</li>
                      </Link>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      ) : (
        // same about navbar but with ham burger
        <div>
          <div className="flex justify-between fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10 px-4 py-2 items-center ">
            <div className="header">LegalConnect</div>

            <button onClick={handleMenu} className="text-3xl">
              <IoReorderThreeOutline />
            </button>
          </div>
          <div>

            {
              menuOpen && (
                <div className="flex justify-between gap-12 ">
                  <Link to={"/service"}>
                    <li>Find a service</li>
                  </Link>
                  <Link to={"/clientLogin"}>
                    <li>Login</li>
                    <li>Login</li>
                    <li>Login</li>
                    <li>Login</li>
                    <li>Login</li>
                    <li>Login</li>
                    <li>Login</li>
                    <li>Login</li>
                  </Link>
                </div>
              )
            }

          </div>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
