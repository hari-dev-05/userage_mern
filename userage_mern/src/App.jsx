import { useState, useEffect } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !age) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, age }),
    });

    setUsername("");
    setAge("");
    fetchUsers();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add User</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button style={styles.button}>Add User</button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.heading}>Users List</h2>

        {users.length === 0 ? (
          <p style={styles.empty}>No users yet</p>
        ) : (
          <ul style={styles.list}>
            {users.map((u) => (
              <li key={u.id} style={styles.listItem}>
                <span>{u.username}</span>
                <span style={styles.age}>{u.age}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: "15px",
    color: "#333",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },

  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  age: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  empty: {
    color: "#777",
    fontStyle: "italic",
  },
};
