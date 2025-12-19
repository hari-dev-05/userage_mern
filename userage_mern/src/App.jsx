import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !age) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, age }),
    });

    setUsername("");
    setAge("");
    alert("User added");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Add User</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
