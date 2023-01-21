import React from "react";
import regstyle from "../styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    profilePicture: "",
  });
  const [imageURl, setImageURl] = React.useState("");
  const [showValidation, setShowValidation] = React.useState({
    emptypass: true,
    emptyconfirm: true,
    bothequal: false,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const checkpasswords = (e) => {
      //password!== ""
      //confirmpass !==""
      // pass===confirm
      if (
        formData.confirmpassword === "" ||
        (formData.password !== "" && formData.confirmpassword === "")
      ) {
        setShowValidation({
          emptypass: false,
          emptyconfirm: true,
          bothequal: false,
        });
      }
      if (
        formData.password === "" ||
        (formData.password === "" && formData.confirmpassword !== "")
      ) {
        setShowValidation({
          emptypass: true,
          emptyconfirm: false,
          bothequal: false,
        });
      }
      if (
        formData.password === formData.confirmpassword &&
        formData.password !== "" &&
        formData.confirmpassword !== ""
      ) {
        setShowValidation({
          emptypass: false,
          emptyconfirm: false,
          bothequal: true,
        });
      }
      if (formData.password.length !== formData.confirmpassword.length) {
        setShowValidation({
          emptypass: false,
          emptyconfirm: false,
          bothequal: false,
        });
      }
    };
    checkpasswords();
  }, [formData.password, formData.confirmpassword]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Ajay Roy");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsr9ifmyh/upload",
        formData
      );
      setImageURl(res.data.url);
      console.log(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phone, password } = formData;
    try {
      const sendFormData = await axios.post(
        "http://localhost:4000/user/register",
        {
          username,
          email,
          phone,
          password,
          profilePicture: imageURl,
        }
      );
      if (sendFormData.data.token) {
        localStorage.setItem("token", sendFormData.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={regstyle.main}>
      <div className={regstyle.card}>
        <div className={regstyle.left}>
          <h1>Welcome to Heat Riser Chat App</h1>
          <p>A place where u gonna heat up things</p>
          <span>Do you have an account?</span>
          <Link to="/user/login">
            <button>Login</button>
          </Link>
        </div>
        <div className={regstyle.right}>
          <h1>Register</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              maxLength="10"
              max="10"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {showValidation.emptypass && (
              <span style={{ color: "red" }}>Password Cannot be Empty</span>
            )}
            <input
              type="password"
              style={
                showValidation.bothequal ? { border: "1px solid green" } : null
              }
              name="confirmpassword"
              placeholder="Confirm Password"
              value={formData.confirmpassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmpassword: e.target.value })
              }
            />
            {showValidation.emptyconfirm && (
              <span style={{ color: "red" }}>
                Confirm Password Cannot be Empty
              </span>
            )}
            {showValidation.bothequal
              ? showValidation.bothequal && (
                  <span style={{ color: "green" }}>
                    Entered Password matched
                  </span>
                )
              : showValidation.bothequal && (
                  <span style={{ color: "red" }}>
                    Entered Password doesn't matched
                  </span>
                )}
            <input
              type="file"
              name="profilePicture"
              placeholder="Name"
              onChange={(e) => uploadImage(e)}
            />
            <input
              className={regstyle.button}
              type="submit"
              value="Register"
              disabled={!showValidation.bothequal}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
