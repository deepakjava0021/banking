import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styless from "./Login.module.css";
import { useEffect } from "react";

export default function Login() {
  const emailGet = useRef();
  const passwordGet = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleClick = (event) => {
    event.preventDefault();
    const email = emailGet.current.value;
    const password = passwordGet.current.value;

    fetch(
      `http://localhost:8080/api/getByEmail?email=${email}&password=${password}`,
      {
        method: "GET",
      }
    )
      // fetch(
      //   `banking-server-production-70b4.up.railway.app/getByEmail?email=${email}&password=${password}`,
      //   { method: "GET" }
      // )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, data.id);
        if (data && data.id) {
          // alert("login successfully ");
          localStorage.setItem("userId", data.id);
          navigate("/dashboard");
        } else {
          alert("user not found or Invalid Credentials ");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        navigate("/signup");
        alert(
          "An error occurred during login. Please try again. Or Create An Account "
        );
      })

      .finally(() => {
        emailGet.current.value = "";
        passwordGet.current.value = "";
      });
  };

  return (
    <div className={styless.container}>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            ref={emailGet}
            placeholder="enter your email address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            ref={passwordGet}
            placeholder="enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
