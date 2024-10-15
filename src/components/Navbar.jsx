import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // logout
  const logout = () => {
    localStorage.clear("token");
    navigate("/");
    toast.success("Logged out!");
  };

  return (
    <>
      <header className="bg-purple-300 text-white p-5 font-bold shadow-lg">
        <div className="flex justify-between">
          <div className="logo text-purple-700 text-2xl">TODOS.in</div>
          <nav>
            <ul className="flex gap-3">
              {token ? (
                <>
                  <li>
                    <Link className="bg-purple-600 p-2 rounded" to={"/home"}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="bg-purple-600 p-2 rounded"
                      to={"/home/myTask"}
                    >
                      My Task
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="bg-purple-600 p-2 rounded"
                      to={"/home/add"}
                    >
                      Add Task
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="bg-purple-600 p-2 rounded"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}
