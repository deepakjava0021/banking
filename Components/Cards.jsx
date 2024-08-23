import { useState } from "react";
import { useEffect } from "react";
import styless from "./Cards.module.css";
import { MdDeleteForever } from "react-icons/md";
import Message from "./Message";
import { Link } from "react-router-dom";

export default function Cards() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/getAll", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/DeleteById?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      console.log(id);
    });
  };

  return (
    <div className={styless.container}>
      {users.length === 0 && <Message />}
      {users.map((user) => (
        <div key={user.id} className={styless.card}>
          <b>
            <h1>{user.name}</h1>
          </b>
          <hr></hr>
          <p>Email: {user.email}</p>
          <p>Password: ********</p>
          <p>Father's Name: {user.fatherName}</p>
          <p>Total Amount : {user.balance}</p>
          <h1>
            <button
              onClick={() => handleDelete(user.id)}
              className="btn btn-danger"
            >
              <MdDeleteForever />
            </button>
          </h1>
        </div>
      ))}
    </div>
  );
}
