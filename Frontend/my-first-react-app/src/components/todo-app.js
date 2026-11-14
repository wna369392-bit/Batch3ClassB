"use client";
import { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [indexToUpdate, setIndexToUpdate] = useState(null);

  // ✅ Add (Create)
  const addTodo = () => {
    if (task.trim() === "") return alert("Enter a task!");
    setTodos([...todos, task]);
    setTask("");
  };

  // ✅ Delete (Remove)
  const deleteTodo = (indexToDelete) => {
    const newList = todos.filter((_, i) => i !== indexToDelete);
    setTodos(newList);
  };

  const updateTodo = () => {
    if (task.trim() === "") return alert("Enter a task!");

    const updatedList = todos.map((item, i) => {
      return i === indexToUpdate ? task : item;
    });

    console.log("updatedList", updatedList);

    setTodos(updatedList);
    setIndexToUpdate(null);
    setTask("");
  };

  const showUpdateForm = indexToUpdate != null ? true : false;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Todo CRUD App</h1>

      {/* Input + Add button */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          style={{ flexGrow: 1, padding: "8px" }}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />

        <button
          style={{
            padding: "8px 16px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            if (showUpdateForm) {
              updateTodo();
            } else {
              addTodo();
            }
          }}
        >
          {showUpdateForm ? "Update" : "Add"}
        </button>

        {showUpdateForm && (
          <button
            style={{
              padding: "8px 16px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setIndexToUpdate(null);
              setTask("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f2f2f2",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            <span>Index: {index}</span>

            <span>{item}</span>

            <div>
              <button
                style={{
                  marginRight: "8px",
                  background: "#2196f3",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
                onClick={() => {
                  console.log("clicked row item:", item, "row index:", index);
                  setIndexToUpdate(index);
                  setTask(item);
                }}
              >
                Edit
              </button>

              <button
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
