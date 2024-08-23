import { Link } from "react-router-dom";
import styless from "./Dashboards.module.css";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Dashboards() {
  const transactionTypeRef = useRef();
  const balanceGet = useRef();
  const [userId, setUserId] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    // console.log("Retrieved userId from localStorage:", id);
    setUserId(id ? Number(id) : null);
  }, []);

  // used this when we are not able to access userId from localStorage
  // and also used for logout and clear the localstorage
  const handleLogout = () => {
    localStorage.clear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const type = transactionTypeRef.current.value;
    const amount = parseFloat(balanceGet.current.value);

    // console.log(type, amount);
    // console.log(userId);

    const transactionData = {
      userId,
      type,
      amount,
    };
    if (amount < 0) {
      alert("Enter positive number");
      return;
    }

    // console.log("Transaction Data:", transactionData);

    fetch("http://localhost:8080/api/doTransaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.text())
      .then((data) => {
        // console.log("this is my data", data);
        if (data === "transaction not complete") {
          alert("Balance is too low or error occured ...");
        } else if (data === "transaction complete") {
          alert("Transaction completed successfully...");
        }
        console.log("data send to the server ", data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        transactionTypeRef.current.value = "Open this select menu";
        balanceGet.current.value = " ";
      });
  };

  return (
    <>
      <div className={styless.logout}>
        <Link to={"/home"}>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </Link>
      </div>
      <div className={styless.container}>
        <form onSubmit={handleSubmit}>
          <select
            ref={transactionTypeRef}
            className="select form-control form-selected"
          >
            <option selected>Open this select menu</option>
            <option>Withdraw</option>
            <option>Deposit</option>
          </select>
          <div>
            <input
              ref={balanceGet}
              className="form-control"
              type="number"
              placeholder="enter the amount"
            ></input>
          </div>
          <button className={` btn btn-primary ${styless.submit}`}>
            Submit
          </button>
        </form>
      </div>
      <Link to={"/passbook"}>
        <button type="button" className={` btn btn-info ${styless.container2}`}>
          Passbook
        </button>
      </Link>
    </>
  );
}
