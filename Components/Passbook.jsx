import { useEffect } from "react";
import { useState } from "react";
import styless from "./Passbook.module.css";

export default function Passbook() {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [transactions, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/getTransactions?userId=${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTransactionHistory(data));
  }, [userId]);

  return (
    <>
      <div>
        <h2>Passbook</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
