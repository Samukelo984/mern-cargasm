import "./Login.css";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <main className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label>Username</label>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="login-register">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </main>
  );
};

export default Login;
