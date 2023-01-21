import React from "react";
import loginStyles from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ state, setLoggedIn }) => {
  const [logindata, setLogindata] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState();
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/user/login", {
        email: logindata.email,
        password: logindata.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      setLoggedIn(true);
      setError("");
      console.log(res);
    } catch (err) {
      setError(err.response.data.error);
      setLoggedIn(false);
      console.log(err.response.data.error);
    }
  };
  console.log(logindata);
  return (
    <div className={loginStyles.main}>
      <div className={loginStyles.card}>
        <div className={loginStyles.left}>
          <h1>Burn IT Up</h1>
          <p>
            welcome to <b>Heat Riser</b> chat app.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/user/register">
            <button>Register</button>
          </Link>
        </div>
        <div className={loginStyles.right}>
          <h1>Login</h1>
          <form onSubmit={(e) => handleLoginSubmit(e)}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={logindata.email}
              onChange={(e) =>
                setLogindata({ ...logindata, email: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={logindata.password}
              onChange={(e) =>
                setLogindata({ ...logindata, password: e.target.value })
              }
            />
            {error && <span style={{ color: "red" }}>{error}</span>}
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
