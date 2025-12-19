import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Todo = () => {
  const [todo, setTodo] = useState("");

  

  const addList = async () => {
    const {  error } = await supabase
      .from("list")
      .insert([{ name: todo }])
      .select();

      if (error) {
       throw new Error("error fetching data")
      } else {
        console.log(todo);
        setTodo('')
      }
  };

  const queryClient = useQueryClient();

  const {mutate} = useMutation({mutationFn: addList, onSuccess: () => {
    //necessary for list to re-fetch 
    queryClient.invalidateQueries(['list'])
  }});

  const handleClick = () => {
    mutate({name: todo});
  }

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
        <button type="button " className="btn btn-primary" onClick={handleClick}>
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
