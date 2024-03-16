import { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Todo from "./Todo";
import { db } from "../firebase/firebase";
import Header from "./Header";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen p-4 ">
        <div className="max-w-[750px] w-full m-auto rounded-2xl shadow-xl p-4">
          <h3 className="text-3xl font-bold text-center text-teal-800 p-2">
            Start Adding Todos
          </h3>
          <form onSubmit={createTodo} className="flex justify-between">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border rounded-2xl p-2 w-full text-xl"
              type="text"
              placeholder="Add Todo..."
            />
            <button className="border px-4 py-2 ml-2 rounded-2xl bg-teal-400 text-slate-100">
              <IoAddCircleOutline size={25} />
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          {todos.length < 1 ? null : (
            <p className="text-center p-2">{`You have ${todos.length} todos`}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
