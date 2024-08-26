import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import "../src/App.css";

export default function Signup() {
  let nameGet = useRef();
  let fatherNameGet = useRef();
  let emailGet = useRef();
  let passwordGet = useRef();
  let navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    let name = nameGet.current.value;
    let fatherName = fatherNameGet.current.value;
    let email = emailGet.current.value;
    let password = passwordGet.current.value;
    console.log(name, fatherName, email, password);
    nameGet.current.value = " ";
    fatherNameGet.current.value = " ";
    emailGet.current.value = " ";
    passwordGet.current.value = " ";

    const data = {
      name: name,
      fatherName: fatherName,
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())

      .then((data) => {
        navigate("/login");
        console.log("data send to the server ", data);
      })
      .catch((error) => console.log("error : ", error));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleClick}>
        <div className={`mb-3 `}>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${styles.inputsize}`}
            aria-describedby="emailHelp"
            ref={nameGet}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Father Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            ref={fatherNameGet}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            ref={emailGet}
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
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
