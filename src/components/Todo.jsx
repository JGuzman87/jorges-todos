import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const addList = async () => {
    const { error } = await supabase
      .from("list")
      .insert([{ name: todo }])
      .select();

    if (error) {
      throw new Error("error fetching data");
    } else {
      console.log(todo);
      setTodo("");
    }
  };

  //useQueryClient() is necessary for list to re-fetch

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addList,
    //necessary for list to re-fetch
    onSuccess: () => {
      queryClient.invalidateQueries(["list"]);
    },
  });

  const handleClick = () => {
    mutate({ name: todo });
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Todo;
