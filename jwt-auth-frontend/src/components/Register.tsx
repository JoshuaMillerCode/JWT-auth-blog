import { useState, FC } from "react";

const Register: FC<{ setFormSwitch: (form: "login" | "register") => void }> = ({ setFormSwitch }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
      console.error("Register failed");
    }
    const data = await res.json();
    setMessage(data.message);
    setFormSwitch("login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create an account!</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <button type="submit" disabled={password !== confirmPassword}>Register</button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default Register;