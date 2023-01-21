import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  console.log(localStorage.getItem("token"));
  const loggedinornot = () => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    loggedinornot();
  }, [loggedin]);
  console.log(loggedin);
  const Router = createBrowserRouter([
    {
      path: "/",
      element: loggedin ? (
        <HomePage />
      ) : (
        <LoginPage state={loggedin} setLoggedIn={setLoggedIn} />
      ),
    },
    {
      path: "/user/login",
      element: <LoginPage />,
    },
    {
      path: "/user/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
