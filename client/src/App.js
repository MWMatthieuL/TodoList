import TodoInput from "./components/todoinput.js"
import TodoList from "./components/todolist.js"
function App() {
  // fetch("http://localhost:3000/todos/getAll").then((response) => response.json())

  return (
    <div className="App" style={{ margin: 0, padding: 0 }}>
      <TodoInput></TodoInput>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
