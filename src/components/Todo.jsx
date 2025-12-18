import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const addList = async () => {
    const {  error } = await supabase
      .from("list")
      .insert([{ name: todo }])
      .select();

      if (error) {
        alert(error.message)
      } else {
        console.log(todo);
        setTodo('')
      }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <input
          className="p-1"
          type="text"
          placeholder="enter todo..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="button " className="btn btn-primary" onClick={() => addList()}>
          Submit
        </button>
      </div>

      <div>
        <ul></ul>
      </div>
    </>
  );
};

export default Todo;
