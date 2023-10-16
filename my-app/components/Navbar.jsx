"use client";
import React, { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Web3walletContext } from "@/hooks/web3wallet";

function Navbar() {
  const { type, setWalletConnected, setAddress } =
    useContext(Web3walletContext);
  const [profilevisible, setProfilevisible] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuroutes = ["/doctor", "/patient", "/admin"];
  const routes = ["/", "/doctor/login", "/patient/login"];
  const handlePush = (url) => {
    router.push(url);
  };

  const handleLogout = () => {
    setAddress("");
    setWalletConnected("");
    router.push("/");
  };
  useEffect(() => {
    console.log(pathname);
    if (routes.includes(pathname)) {
      setProfilevisible(false);
    } else {
      setProfilevisible(true);
    }
    if (
      pathname == menuroutes[0] ||
      pathname == menuroutes[1] ||
      pathname == menuroutes[2]
    ) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, [pathname]);
  return (
    <div className="navbar bg-base-100">
      {menu ? (
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}

            <label className="btn swap swap-rotate" htmlFor="my-drawer">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label> */}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <RenderList path={pathname} />
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            EHR{" "}
          </a>
        </div>
      )}
      <div className="flex-none gap-2">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 bg-[#272C3300]">
            <li>
              <a onClick={() => handlePush("/doctor")}>Doctor</a>
            </li>

            <li>
              <a onClick={() => handlePush("/patient")}>patient</a>
            </li>
          </ul>
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {profilevisible && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {type == "doctor" && !pathname.includes("/register") && (
                  <img src="/doctor.jpg" />
                )}
                {type == "patient" && !pathname.includes("/register") && (
                  <img src="/patient.jpg" />
                )}
                {type == "admin" && !pathname.includes("/register") && (
                  <img src="/admin.png" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {type != "admin" && (
                <li onClick={() => handlePush(`/${type}/profile`)}>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
              )}
              <li onClick={() => handlePush(`/${type}`)}>
                <a>{type} home</a>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const RenderList = ({ path }) => {
  const router = useRouter();
  const [list, setList] = useState({
    doctor: [
      { title: "profile", path: "/doctor/profile" },
      { title: "send file", path: "/doctor/sendfile" },
      { title: "appointments", path: "/doctor/appointments" },
      { title: "recievedfiles", path: "/doctor/recievedfiles" },
      { title: "examine details", path: "/doctor/examinedetails" },
    ],
    patient: [
      { title: "profile", path: "/patient/profile" },
      { title: "send file", path: "/patient/sendfile" },
      { title: "appointments", path: "/patient/appointments" },
      { title: "recievedfiles", path: "/patient/recievedfiles" },
      { title: "examine details", path: "/patient/examinedetails" },
      { title: "buy insurance", path: "/patient/buyinsurance" },
    ],
    admin: [
      { title: "add doctor", path: "/admin/registerdoctor" },
      { title: "book an appointment", path: "/admin/bookappointment" },
      { title: "doctors", path: "/admin/doctors" },
      { title: "patients", path: "/admin/patients" },
    ],
  });
  const handlePath = (url) => {
    router.push(url);
  };

  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      {list[path.slice(1)] &&
        list[path.slice(1)].map((item) => (
          <li onClick={() => handlePath(item.path)}>
            <a>{item.title}</a>
          </li>
        ))}
    </ul>
  );
};

export default Navbar;
