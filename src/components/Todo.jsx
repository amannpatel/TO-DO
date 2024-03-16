import { FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li
      className={
        todo.completed
          ? "flex rounded-2xl justify-between bg-teal-200 p-4 my-2 capitalize"
          : "flex rounded-2xl justify-between bg-teal-100 p-4 my-2 capitalize"
      }
    >
      <div className="flex">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={
            todo.completed
              ? "ml-2 cursor-pointer line-through"
              : "ml-2 cursor-pointer"
          }
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Todo;
