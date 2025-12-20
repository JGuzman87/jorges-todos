import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./lib/supabaseClient";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  //useQueryClient() is necessary for list to re-fetch

  const queryClient = useQueryClient();

  //function to fetch from Supabase
  const getList = async () => {
    console.log("FETCHING FROM SERVER");

    const { data, error } = await supabase.from("list").select("*");
    if (error) {
      throw new Error("Error fetching data");
    }
    return data;
  };

  // Fetches and caches the list data from Supabase using TanStack Query
  // and provides loading state via isLoading

  const { data, isLoading } = useQuery({
    queryKey: ["list"],
    queryFn: getList,
  });

  //function to delete from Supabase
  const deleteList = async (id) => {
    const { data, error } = await supabase
      .from("list")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      throw new Error("unable to delete list");
    }
    console.log(data);
    return data;
  };

  //mutates list data in order to delete
  const { mutate } = useMutation({
    mutationFn: (id) => deleteList(id),

    onSuccess: () => {
      queryClient.invalidateQueries(["list"]);
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <Todo />
      <ul className="flex flex-col gap-2 w-full md:w-1/2">
        <AnimatePresence>
          {!isLoading &&
            data.map((list) => (
              <motion.li
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={list.id}
                className="flex justify-between bg-red-100 rounded-md shadow-2xl text-start p-2"
              >
                {list.name}
                <button className="btn w-fit" onClick={() => mutate(list.id)}>
                  Delete
                </button>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
