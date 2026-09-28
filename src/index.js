import "./styles.css";
import todoFactory from "./todo.js";

const td1 = todoFactory.createTodo(
  "Title one",
  "This is a test",
  new Date("12/25/2026"),
  "high",
  "NA"
);

const td2 = todoFactory.createTodo("Title two", "Another test");

console.log(JSON.stringify(td1, null, 2));
console.log(JSON.stringify(td2, null, 2));

const updatedTD1 = todoFactory.updateTodo(td1, { title: "Updated Title" });
const updatedTD2 = todoFactory.updateTodo(td2, {
  notes: "This is a note!",
  completed: todoFactory.toggleComplete(),
});

console.log(JSON.stringify(updatedTD1, null, 2));
console.log(JSON.stringify(updatedTD2, null, 2));
