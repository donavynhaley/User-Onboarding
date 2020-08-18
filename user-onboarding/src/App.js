import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/form.js";
function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <Form users={users} setUsers={setUsers} />
      {users.map((user) => {
        return (
          <div className="user">
            <h1>Name: {user.name}</h1>
            <h2>Email {user.email}</h2>
            <h2>Password {user.password}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
