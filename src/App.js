import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/dist/v4";

/* 
//localStorage.getItem("item name");
//localStorage.setItem("item name");
const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 },
]; 
*/

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // **************** state values **************************
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // **************** useEffect **************************
  useEffect(() => {
    console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  // **************** functionality **************************
  const handleCharge = (e) => {
    //console.log(`charge ${e.target.value}`);
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    //console.log(`amount ${e.target.value}`);
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(charge, amount);
    if (charge !== "") {
      //&& amount > 0
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value is bigger than zero`,
      });
    }
  };

  // clear all items
  const clearItems = () => {
    //console.log("cleared all items");
    setExpenses([]);
    handleAlert({ type: "danger", text: "all item deleted" });
  };

  // handle Delete
  const handleDelete = (id) => {
    //console.log(`item deleted : ${id}`);
    let tempExpenses = expenses.filter((item) => item.id !== id);
    //console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  // handle Edit
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    //console.log(expense);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    handleAlert({ type: "success", text: "item edited" });
  };

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Expense Tracker App</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total balance :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </div>
  );
}

export default App;
