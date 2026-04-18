import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>TODO App</h1>

        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addTask}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task, index) => (
            <li key={index} style={styles.listItem}>
              <span
                onClick={() => toggleTask(index)}
                style={{
                  ...styles.taskText,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
  },
  addBtn: {
    padding: "8px 12px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  taskText: {
    cursor: "pointer",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default App;