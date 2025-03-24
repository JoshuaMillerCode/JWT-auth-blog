"use client"
import { useState } from "react";
import { User } from "../utils/types";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [formSwitch, setFormSwitch] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);

  const sendAuthorizedRequest = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3001/api/protected", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Welcome to Guest Dashboard</h1>
      <div>
        {user ? (
          <div>
            <p>Logged in as {user.username}</p>


            <button onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
            }}>Logout</button>
          </div>
        ) : (
          <>
            <p>You are not logged in</p>
            <p className="hover:underline hover:text-blue" onClick={() => setFormSwitch("register")}>Dont have an account yet? Create one here!</p>
            {formSwitch === "login" ? (
              <Login setUser={setUser} />
            ) : (
              <Register setFormSwitch={setFormSwitch} />
            )}
          </>
        )}

        <button onClick={() => sendAuthorizedRequest()}>Send { user ? "A" : "Una"}{}uthorized request</button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
